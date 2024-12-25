"use client";

import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import { Icons } from "@/components/ui/icons/icons";
import Link from "next/link";

export default function NotFound() {
  const router = useRouter();
  return (
    <section>
      <div className="container mx-auto flex min-h-[calc(100vh-8rem)] items-center px-6 py-12">
        <div className="mx-auto flex max-w-sm flex-col items-center text-center">
          <p className="rounded-full bg-primary p-3 text-sm font-medium">
            <Icons.laptop className="size-6 text-secondary" />
          </p>
          <h1 className="mt-3 text-2xl font-semibold text-gray-800 dark:text-white md:text-3xl">
            This page is under construction
          </h1>
          <p className="mt-4 text-muted-foreground">
            We are working on it and it will be ready soon!
          </p>

          <Link href="/docs" className="group mt-5 flex w-full shrink-0 items-center gap-x-3 sm:w-auto">
            <Button
              onClick={() => router.back()}
              variant="outline"
            >
              <span>Go home</span>
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
