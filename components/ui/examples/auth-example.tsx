/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import { Button } from "@/components/ui/button";
import { signIn, signOut, useSession } from "next-auth/react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Icons } from "@/components/ui/icons/icons";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import axios from "axios";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

export function Auth() {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const session = useSession();

  const formSchema = z.object({
    name: z.string().min(1, { message: "Name is required" }),
    email: z.string().email(),
    password: z.string().min(1, { message: "Password is required" }),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  const handleSignOut = async () => {
    await signOut();
    router.refresh();
  };

  const handleGitHubSignIn = () => {
    signIn("github", { callbackUrl: "/" });
    toast.success("Successfully signed in with GitHub!");
  };

  const handleGoogleSignIn = () => {
    signIn("google", { callbackUrl: "/" });
  };

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    if (session.status === "authenticated") {
      toast.error("You are already logged in!");
      return;
    }
    try {
      event?.preventDefault();

      await axios.post("/api/auth/signup", {
        email: values.email,
        password: values.password,
        name: values.name,
      });

      const result = await signIn("credentials", {
        email: values.email,
        password: values.password,
        redirect: false,
      });

      if (result?.error) {
        throw new Error(result.error);
      }

      form.reset();
      toast.success("Successfully created account!");
      router.refresh();
    } catch (error) {
      const errorMessage = axios.isAxiosError(error)
        ? error.response?.data || error.message
        : "An error occurred";
      setError(errorMessage);
      toast.error(errorMessage);
    }
  };

  return (
    <Card className="w-full shadow-md shadow-primary/20">
      
      <CardHeader className="space-y-1 pb-2">
        <CardTitle className="text-2xl">Create an account</CardTitle>
        <CardDescription>Enter your email to access.</CardDescription>
      </CardHeader>
      <CardContent className="grid gap-3">
        <Form {...form}>
          <form 
            onSubmit={form.handleSubmit(onSubmit)} 
            className="w-full"
            method="POST"
          >
            <div className="flex gap-4 mb-4">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Tyler Durden" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input placeholder="tyler@gmail.com" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input type="password" placeholder="•••••••" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button className="w-full mt-4" type="submit">
              Create account
            </Button>
          </form>
        </Form>
      </CardContent>
      <div className="relative mb-3">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full mx-6 border-t" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-background px-2 py-[4px] text-muted-foreground">
            Or continue with
          </span>
        </div>
      </div>
      <CardFooter>
        <div className="grid grid-cols-2 gap-6 w-full">
          <Button onClick={handleGoogleSignIn} variant="outline">
            <Icons.google className="mr-2 h-4 w-4" />
            Google
          </Button>
          <Button variant="outline" onClick={handleGitHubSignIn}>
            <Icons.gitHub className="mr-2 h-4 w-4" />
            Github
          </Button>
        </div>
      </CardFooter>
      {/* if logged in card should show persons name and saying hello */}
    </Card>
  );
}
