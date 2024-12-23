import { MainNavItem, SidebarNavItem } from "@/types";

interface DocsConfig {
  mainNav: MainNavItem[];
  sidebarNav: SidebarNavItem[];
}

export const docsConfig: DocsConfig = {
  mainNav: [
    {
      title: "Components",
      href: "/components",
    },
  ],
  sidebarNav: [
    {
      title: "Getting Started",
      items: [
        {
          title: "Introduction",
          href: "/docs",
          items: [],
        },
        {
          title: "Installation",
          href: "/docs/installation",
          items: [
            {
              title: "Next.js",
              href: `/docs/installation/next`,
              items: [],
            },
            {
              title: "Vite",
              href: `/docs/installation/vite`,
              items: [],
            },
            {
              title: "Remix",
              href: `/docs/installation/remix`,
              items: [],
            },
            {
              title: "Astro",
              href: `/docs/installation/astro`,
              items: [],
            },
            {
              title: "Laravel",
              href: `/docs/installation/laravel`,
              items: [],
            },
            {
              title: "Gatsby",
              href: `/docs/installation/gatsby`,
              items: [],
            },
            {
              title: "Manual",
              href: `/docs/installation/manual`,
              items: [],
            },
          ],
        },
        {
          title: "CLI",
          href: "/docs/cli",
          items: [],
        },
        {
          title: "Demo",
          href: "/docs/demo",
          items: [],
        },
      ],
    },
    {
      title: "Components",
      items: [
        {
          title: "Auth",
          href: `/docs/components/auth`,
          items: [],
        },
        {
          title: "Payments",
          href: `/docs/components/payments`,
          items: [],
        },
        {
          title: "Landing Page",
          href: `/docs/components/landing-page`,
          items: [],
        },
        {
          title: "Dashboard",
          href: `/docs/components/dashboard`,
          items: [],
        },
      ],
    },
  ],
};
