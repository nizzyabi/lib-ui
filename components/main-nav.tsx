"use client";

import Link from "next/link";
import { siteConfig } from "@/config/site";

export function MainNav() {
  return (
    <div className="mr-4 hidden md:flex">
      <Link href="/" className="relative mr-6 flex items-center space-x-2">
        <span className="hidden font-bold md:inline-block text-xl">
          {siteConfig.name}
        </span>
      </Link>
    </div>
  );
}
