import Link from "next/link";

export default function Footer() {
  const footerLinks = {
    Links: [
      { name: "Login", href: "/" },
      { name: "Support", href: "/" },
      { name: "Home", href: "/" },
      { name: "Documentation", href: "/" },
    ],
    Legal: [
      { name: "Terms of Service", href: "/" },
      { name: "Privacy Policy", href: "/" },
      { name: "Licenses", href: "/" },
    ],
    Socials: [
      { name: "Twitter", href: "https://x.com/nizzyabi" },
      { name: "GitHub", href: "https://github.com/nizzyabi/lib-ui" },
      { name: "Discord", href: "https://discord.gg/nizzyabi" },
    ],
  };

  return (
    <div className="max-w-4xl mx-auto px-4 my-20">
      <div className="flex flex-col sm:flex-row sm:justify-between space-y-8 sm:space-y-0">
        <div className="flex flex-col space-y-2 mt-2">
          <h1 className="text-sm font-bold">LibUI</h1>
          <p className="text-xs opacity-50">Build full-stack apps with ease</p>
          <p className="text-xs opacity-50">
            Copyright © 2025 - All rights reserved
          </p>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-12">
          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h1 className="text-sm font-bold opacity-80">{title}</h1>
              <div className="flex flex-col space-y-2 mt-2">
                {links.map((link) => (
                  <Link
                    key={link.name}
                    href={link.href}
                    className="text-xs opacity-50"
                  >
                    {link.name}
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
