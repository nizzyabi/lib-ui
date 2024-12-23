import { cn } from "@/lib/utils";
import { ChevronRight } from "lucide-react";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import ShinyButton from "../ui/button-shiny";

export default function Hero() {
  return (
    <div className="relative h-full overflow-hidden py-5 md:py-14">
      <div className="mt-10 grid grid-cols-1 md:mt-20">
        <div className="flex justify-center items-center">
          <Link href="/docs">
            <ShinyButton className="shadow-2xl h-1 w-32">
              <div className="rounded-full group flex items-center space-x-1.5">
                <span className="mr-2">🚀</span> Demo
                <ChevronRight className="h-4 w-4 text-muted-foreground transition-transform group-hover:translate-x-1 duration-300" />
              </div>
            </ShinyButton>
          </Link>
        </div>
        <h1
          className={cn(
            "text-black dark:text-white",
            "relative max-w-[43.5rem] pt-3 mx-auto px-1 md:px-4 md:py-2",
            "text-balance font-semibold tracking-tighter text-center",
            "text-5xl sm:text-6xl md:text-7xl lg:text-7xl"
          )}
        >
          The first ever full-stack component library{" "}
        </h1>
        <p className="max-w-xl mx-auto text-balance text-base tracking-tight text-black dark:font-medium dark:text-white/70 text-center md:text-lg my-3">
          Browse our components and start building your next full-stack
          application{" "}
        </p>
        <div className="flex w-full px-7 md:px-0 max-w-full flex-col items-center py-1 sm:max-w-lg mx-auto">
          <div className="flex w-full flex-col sm:flex-row items-center justify-center gap-2">
            <Link
              href="/components"
              className={cn(
                buttonVariants({
                  size: "lg",
                  variant: "shiny",
                }),
                "gap-2"
              )}
            >
              Browse components
            </Link>
            <Link
              href="/components"
              className={cn(
                buttonVariants({
                  variant: "ghost",
                  size: "lg",
                  className: "hover:bg-transparent group",
                }),
                "gap-2"
              )}
            >
              Github
              <ChevronRight className="h-4 w-4 text-muted-foreground transition-transform group-hover:translate-x-1 duration-300" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
