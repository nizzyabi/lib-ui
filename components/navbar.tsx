import Link from "next/link";
import { ThemeToggle } from "./ui/theme/theme-toggle";
import { buttonVariants } from "./ui/button";
import { cn } from "@/lib/utils";
import { Icons } from "./ui/icons/icons";
import { CommandMenu } from "./command-menu";
import { siteConfig } from "@/config/site";
import { StarIcon } from "@heroicons/react/24/solid";
import NumberTicker from "./ui/number-ticker";

export async function Navbar() {
  let stars = 50;

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
      stars = data.stargazers_count || stars; // Update stars if API response is valid
    }
  } catch (error) {
    console.error("Error fetching GitHub stars:", error);
  }
  return (
    <div className="flex justify-between items-center p-4">
      <div>
        <Link href="/" className="text-md font-bold">
          LibUI
        </Link>
      </div>
      <div className="flex items-center gap-3 text-sm">
        <div className="flex items-center gap-8">
          <Link href="/components">Components</Link>
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
  );
}
