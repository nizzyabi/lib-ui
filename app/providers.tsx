"use client";

import { SessionProvider } from "next-auth/react";
import posthog from "posthog-js";
import { PostHogProvider } from "posthog-js/react";

if (typeof window !== "undefined") {
  posthog.init(process.env.NEXT_PUBLIC_POSTHOG_KEY || "", {
    api_host: process.env.NEXT_PUBLIC_POSTHOG_HOST || "",
    person_profiles: "identified_only",
  });
}
export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <>
      <SessionProvider>
        <PostHogProvider client={posthog}>{children}</PostHogProvider>
      </SessionProvider>
    </>
  );
}
