/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import { Button } from "@/components/ui/button";
import { signIn } from "next-auth/react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Icons } from "@/components/ui/icons/icons";
import { useState, useRef } from "react";
import { useRouter } from "next/navigation";

export function Auth() {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const handleGitHubSignIn = () => {
    signIn('github', { callbackUrl: '/' })
  }

  const handleGoogleSignIn = () => {
    signIn('google', { callbackUrl: '/' })
  }

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    try {
      const res = await fetch("/api/auth/signup", {
        method: "POST",
        body: JSON.stringify({
          email: formData.get("email"),
          password: formData.get("password"),
          name: formData.get("name"),
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!res.ok) {
        throw new Error(await res.text());
      }

      const result = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });

      if (result?.error) {
        throw new Error(result.error);
      }

      if (formRef.current) {
        formRef.current.reset();
      }
      router.refresh();
    } catch (error: any) {
      setError(error.message);
    }
  };
  return (
    <form ref={formRef} onSubmit={onSubmit} className="w-full">
      <Card className="w-full shadow-md shadow-primary/20">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl">Create an account</CardTitle>
          <CardDescription>Enter your email to access.</CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4">
          <div className="flex gap-4">
            <div className="grid gap-2">
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                type="text"
                name="name"
                placeholder="Tyler Durden"
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                name="email"
                placeholder="tyler@gmail.com"
              />
            </div>
          </div>
          <div className="grid gap-2">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              name="password"
              placeholder="••••••••"
            />
          </div>
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-background px-2 py-[4px] text-muted-foreground">
                Or continue with
              </span>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-6">
            <Button onClick={handleGoogleSignIn} variant="outline">
              <Icons.google className="mr-2 h-4 w-4" />
              Google
            </Button>
            <Button variant="outline" onClick={handleGitHubSignIn}>
              <Icons.gitHub className="mr-2 h-4 w-4" />
              Github
            </Button>
          </div>
        </CardContent>
        <CardFooter>
          <Button className="w-full" type="submit">
            Create account
          </Button>
        </CardFooter>
        {/* if logged in card should show persons name and saying hello */}
      </Card>
    </form>
  );
}
