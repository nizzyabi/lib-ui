import { cn } from "@/lib/utils";
import { ChevronRight } from "lucide-react";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

export default function Hero() {
  return (
    <div className="relative h-full overflow-hidden py-5 md:py-14">
      <div className="mt-10 grid grid-cols-1 md:mt-20">
        <div className="flex justify-center items-center">
          <Link
            href="/auth"
            className={cn(
              buttonVariants({
                variant: "outline",
                size: "sm",
              }),
              "rounded-full"
            )}
          >
            🚀 <Separator className="mx-2 h-4" orientation="vertical" />
            About us
            <ChevronRight className="ml-1 h-4 w-4 text-muted-foreground" />
          </Link>
        </div>
        <h1
          className={cn(
            "text-black dark:text-white",
            "relative max-w-[43.5rem]  pt-5 mx-auto md:px-4 md:py-2",
            "text-balance font-semibold tracking-tighter text-center",
            "text-5xl sm:text-7xl md:text-7xl lg:text-7xl"
          )}
        >
          The first ever fullstack library{" "}
        </h1>
        <p className="max-w-xl mx-auto text-balance text-base tracking-tight text-black dark:font-medium dark:text-white text-center md:text-lg ">
          Browse our components and start building your next project
        </p>
        <div className="flex w-full px-7 md:px-0 max-w-full flex-col items-center py-1 sm:max-w-lg mx-auto">
          <div className="flex w-full flex-col items-center justify-center">
            <Link
              href="/components"
              className={cn(
                buttonVariants({
                  variant: "outline",
                  size: "lg",
                }),
                "gap-2"
              )}
            >
              Browse Components
              <ChevronRight className="ml-1 size-4 shrink-0 transition-all duration-300 ease-out group-hover:translate-x-1" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
