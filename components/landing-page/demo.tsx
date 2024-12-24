import ShinyButton from "@/components/ui/button-shiny";
import { cn } from "@/lib/utils";
import { HeroVideoDialog } from "../ui/hero-video-dialog";

export default function Demo() {
  return (
    <div>
      <div className="flex justify-center items-center">
        <ShinyButton className="shadow-2xl h-1 w-32">
          <div className="rounded-full group flex items-center space-x-1.5">
            How it works
          </div>
        </ShinyButton>
      </div>
      <div>
        <h1
          className={cn(
            "text-black dark:text-white",
            "relative max-w-[43.5rem] pt-3 mx-auto px-1 md:px-4 md:py-2",
            "text-balance font-semibold tracking-tighter text-center",
            "text-3xl sm:text-4xl md:text-5xl lg:text-5xl"
          )}
        >
          Full-stack components are just one click away
        </h1>
        <p className="max-w-xl mx-auto text-balance tracking-tight text-black dark:font-medium dark:text-white/70 text-center md:text-base my-3">
          Want to see how LibUI works? Checkout out the demo video below!{" "}
        </p>
      </div>
      <div className="max-w-4xl mx-auto px-4">
        <HeroVideoDialog
          className="dark:hidden block"
          animationStyle="top-in-bottom-out"
          videoSrc="https://www.youtube.com/embed/qh3NGpYRG3I?si=4rb-zSdDkVK9qxxb"
          thumbnailSrc="https://startup-template-sage.vercel.app/hero-light.png"
          thumbnailAlt="Hero Video"
        />
        <HeroVideoDialog
          className="hidden dark:block"
          animationStyle="top-in-bottom-out"
          videoSrc="https://www.youtube.com/embed/qh3NGpYRG3I?si=4rb-zSdDkVK9qxxb"
          thumbnailSrc="https://startup-template-sage.vercel.app/hero-dark.png"
          thumbnailAlt="Hero Video"
        />
      </div>
    </div>
  );
}
