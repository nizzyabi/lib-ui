import Link from "next/link";
import { ThemeToggle } from "./ui/theme/theme-toggle";
import { buttonVariants } from "./ui/button";
import { cn } from "@/lib/utils";
import { Icons } from "./ui/icons/icons";

export const Navbar = () => {
  return (
    <div className="flex justify-between items-center p-4">
      <div>
        <Link href="/" className="text-md font-bold">
          LibUI
        </Link>
      </div>
      <div className="flex items-center gap-3 text-sm">
        <div className="flex items-center gap-8">
          <Link href="/docs">Docs</Link>
          <Link href="/components">Components</Link>
        </div>
        <div
          className={cn(
            buttonVariants({
              variant: "ghost",
              size: "icon",
            }),
            ""
          )}
        >
          <Icons.gitHub className="size-4" />
          <span className="sr-only">GitHub</span>
        </div>
        <ThemeToggle />
      </div>
    </div>
  );
};
