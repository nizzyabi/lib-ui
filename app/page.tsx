import Footer from "@/components/footer";
import Components from "@/components/landing-page/components";
import Demo from "@/components/landing-page/demo";
import Hero from "@/components/landing-page/hero";

export default function Home() {
  return (
    <>
      <Hero />
      <div className="space-y-64 pt-20 pb-5 md:pb-20">
        <Components />
        <Demo />
      </div>
      <Footer />
    </>
  );
}
