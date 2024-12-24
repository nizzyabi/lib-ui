import Demo from "@/components/landing-page/demo";
import Hero from "@/components/landing-page/hero";

export default function Home() {
  return (
    <div className="space-y-60 py-5 md:py-14">
      <Hero />
      <Demo />
    </div>
  );
}
