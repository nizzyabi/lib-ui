"use client";

import { cn } from "@/lib/utils";
import { ChevronRight } from "lucide-react";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import ShinyButton from "../ui/button-shiny";
import Image from "next/image";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

export default function Hero() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const variants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <div className="flex h-screen items-center justify-center -mt-16">
      <div className="w-full max-w-screen-xl mx-auto px-4">
        <div className="grid grid-cols-1">
          <motion.div
            className="flex justify-center items-center"
            variants={variants}
            initial="hidden"
            animate={isVisible ? "visible" : "hidden"}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <Link href="/docs">
              <ShinyButton className="shadow-2xl h-1 w-32">
                <div className="rounded-full group flex items-center space-x-1.5">
                  <span className="mr-2">🚀</span> Demo
                  <ChevronRight className="h-4 w-4 text-muted-foreground transition-transform group-hover:translate-x-1 duration-300" />
                </div>
              </ShinyButton>
            </Link>
          </motion.div>
          <motion.h1
            className={cn(
              "text-black dark:text-white",
              "relative max-w-[43.5rem] pt-3 mx-auto px-1 md:px-4 md:py-2",
              "text-balance font-semibold tracking-tighter text-center",
              "text-5xl sm:text-6xl md:text-7xl lg:text-7xl"
            )}
            variants={variants}
            initial="hidden"
            animate={isVisible ? "visible" : "hidden"}
            transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
          >
            The first ever full-stack component library{" "}
          </motion.h1>
          <motion.p
            className="max-w-xl mx-auto text-balance text-base tracking-tight text-black dark:font-medium dark:text-white/70 text-center md:text-lg my-3"
            variants={variants}
            initial="hidden"
            animate={isVisible ? "visible" : "hidden"}
            transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
          >
            Browse our components and start building your next full-stack
            application{" "}
          </motion.p>
          <motion.div
            className="flex w-full px-7 md:px-0 max-w-full flex-col items-center py-1 sm:max-w-lg mx-auto"
            variants={variants}
            initial="hidden"
            animate={isVisible ? "visible" : "hidden"}
            transition={{ duration: 0.8, delay: 0.5, ease: "easeOut" }}
          >
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
                href="https://github.com/nizzyabi/lib-ui"
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
          </motion.div>
        </div>

        <motion.div
          className="mt-6 flex flex-wrap justify-center items-center gap-x-12 gap-y-8 px-6"
          variants={variants}
          initial="hidden"
          animate={isVisible ? "visible" : "hidden"}
          transition={{ duration: 0.8, delay: 0.6, ease: "easeOut" }}
        >
          <div className="relative w-20 h-7">
            <Image
              src="/logos/resend.svg"
              alt="Resend"
              fill
              className="object-contain dark:invert"
            />
          </div>
          <div className="relative w-20 h-7">
            <Image
              src="/logos/auth.svg"
              alt="Auth.js"
              fill
              className="object-contain dark:invert"
            />
          </div>
          <div className="relative w-24 h-7">
            <Image
              src="/logos/supabase.svg"
              alt="Supabase"
              fill
              className="object-contain dark:invert"
            />
          </div>

          <div className="relative w-20 h-7">
            <Image
              src="/logos/nextjs.svg"
              alt="Next.js"
              fill
              className="object-contain dark:invert"
            />
          </div>
          <div className="relative w-16 h-7">
            <Image
              src="/logos/stripe.svg"
              alt="Stripe"
              fill
              className="object-contain dark:invert"
            />
          </div>
        </motion.div>
      </div>
    </div>
  );
}
