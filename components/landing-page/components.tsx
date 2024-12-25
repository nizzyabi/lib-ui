import { cn } from "@/lib/utils";
import ShinyButton from "@/components/ui/button-shiny";
import { Auth } from "@/components/ui/examples/auth-example";
import Image from "next/image";
import { Chart } from "@/components/ui/examples/chart-example";
import { ProductPayment } from "../ui/examples/product-example";
import { Payment } from "../ui/examples/payment-example";

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
        <Auth />
        <Chart />
        <Payment />
      </div>
    </div>
  );
}
