"use client";

import Footer from "@/components/footer";
import Components from "@/components/landing-page/components";
import Demo from "@/components/landing-page/demo";
import Hero from "@/components/landing-page/hero";
import { useSession } from "next-auth/react";
import { signOut } from "next-auth/react";

export default function Home() {
  const { data: session, status } = useSession();
  console.log("Session status:", status);
  console.log("Full session:", session);
  console.log("User email:", session?.user?.email);
  const handleSignOut = async () => {
    await signOut();
  };

  return (
    <>
      <div className="text-white text-2xl font-bold text-center">
        {status === "loading"
          ? "Loading..."
          : session?.user?.email || "Not signed in"}
      </div>
      <button className="text-white text-2xl font-bold flex items-center justify-center text-center" onClick={handleSignOut}>Sign Out</button>
      <Hero />
      <div className="space-y-64 pt-20 pb-5 md:pb-20">
        <Components />
        <Demo />
      </div>
      <Footer />
    </>
  );
}
