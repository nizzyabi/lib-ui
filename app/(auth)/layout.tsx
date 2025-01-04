"use client";

import { ReactNode } from "react";
import { SessionProvider } from "next-auth/react";

interface AuthLayoutProps {
  children: ReactNode;
}

export default function AuthLayout({ children }: AuthLayoutProps) {
  return <SessionProvider>{children}</SessionProvider>;
} 