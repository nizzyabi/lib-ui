import { cn } from "@/lib/utils";
import ShinyButton from "@/components/ui/button-shiny";
import { Payment } from "@/components/ui/examples/payment-example";
import { Auth } from "@/components/ui/examples/auth-example";
import Image from "next/image";
import { Chart } from "@/components/ui/examples/chart-example";

export default function Components() {
  return (
    <div>
      <div className="flex justify-center items-center">
        <ShinyButton className="shadow-2xl h-1 w-32">
          <div className="rounded-full group flex items-center space-x-1.5">
            Components
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
          Build your next app with our reusable components
        </h1>
        <p className="max-w-xl mx-auto text-balance tracking-tight text-black dark:font-medium dark:text-white/70 text-center md:text-base mt-3 mb-12">
          From auth, to payment, to data visualization, LibUI has it all.
        </p>
      </div>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 px-12 gap-12 max-w-7xl mx-auto">
        <div className="flex flex-col items-center">
          <div className="relative w-24 h-12 mb-4">
            <Image
              src="/logos/stripe.svg"
              alt="Stripe"
              fill
              className="object-contain dark:invert"
            />
          </div>
          <Payment />
        </div>
        <div className="flex flex-col items-center">
          <div className="relative w-28 h-12 mb-6">
            <Image
              src="/logos/recharts.svg"
              alt="Recharts"
              fill
              className="object-contain dark:invert"
            />
          </div>
          <Chart />
        </div>
        <div className="flex flex-col items-center">
          <div className="relative w-24 h-12 mb-4">
            <Image
              src="/logos/auth.svg"
              alt="Auth.js"
              fill
              className="object-contain dark:invert"
            />
          </div>
          <Auth />
        </div>
      </div>
    </div>
  );
}
