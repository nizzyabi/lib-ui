import { StarIcon } from "@heroicons/react/24/solid";
import Link from "next/link";

import { CommandMenu } from "@/components/command-menu";
import { Icons } from "@/components/ui/icons/icons";
import { MainNav } from "@/components/main-nav";
import { MobileNav } from "@/components/mobile-nav";
import { ThemeToggle } from "./ui/theme/theme-toggle";
import { buttonVariants } from "@/components/ui/button";
import { siteConfig } from "@/config/site";
import { cn } from "@/lib/utils";
import NumberTicker from "@/components/ui/number-ticker";

export async function SiteHeader() {
  let stars = 300;

  try {
    const response = await fetch(
      "https://api.github.com/repos/nizzyabi/lib-ui",
      {
        headers: process.env.GITHUB_OAUTH_TOKEN
          ? {
              Authorization: `Bearer ${process.env.GITHUB_OAUTH_TOKEN}`,
              "Content-Type": "application/json",
            }
          : {},
        next: {
          revalidate: 3600,
        },
      }
    );

    if (response.ok) {
      const data = await response.json();
      stars = data.stargazers_count || stars;
    }
  } catch (error) {
    console.error("Error fetching GitHub stars:", error);
  }

  return (
    <header
      className={cn(
        "supports-backdrop-blur:bg-background/90 sticky top-0 z-40 w-full bg-background/40 backdrop-blur-lg px-4"
      )}
    >
      <div className="flex h-16 items-center justify-between">
        <MainNav />
        <MobileNav />
        <div className="flex items-center gap-3 text-sm">
        <div className="flex items-center gap-8">
          <Link href="/components" className="hidden md:flex">Components</Link>
          <Link
            className={cn(
              buttonVariants({
                variant: "outline",
              }),
              "hidden md:inline-flex h-8 bg-black dark:bg-white group hover:opacity-100 hover:bg-black hover:dark:bg-white"
            )}
            target="_blank"
            href={siteConfig.links.github}
          >
            <div className="flex items-center text-white dark:text-black">
              <Icons.gitHub className="size-4" />
              <span className="ml-1 lg:hidden">Star</span>
              <span className="ml-1 hidden lg:inline">Stars on GitHub</span>{" "}
            </div>
            <div className="ml-2 flex items-center gap-1 text-sm md:flex">
              <StarIcon className="size-4 text-gray-500 transition-all duration-300 group-hover:text-yellow-300" />
              <NumberTicker
                value={stars}
                className="font-display font-medium text-white dark:text-black"
              />
            </div>
          </Link>
          <CommandMenu />
        </div>
        <div
          className={cn(
            buttonVariants({
              variant: "ghost",
              size: "icon",
            })
          )}
        >
          <Icons.gitHub className="size-4" />
          <span className="sr-only">GitHub</span>
        </div>
        <ThemeToggle />
      </div>
      </div>
    </header>
  );
}
