import Link from "next/link";
import { ThemeToggle } from "./theme/theme-toggle";

export const Navbar = () => {
  return (
    <div className="flex justify-between items-center p-4">
      <div>
        <h1 className="text-md font-bold">LibUI</h1>
      </div>
      <div className="flex items-center gap-2">
        <div className="space-x-8 text-sm">
          <Link href="https://github.com/nizzyabi/lib-ui">Github</Link>
          <Link href="/docs">Docs</Link>
          <Link href="/components">Components</Link>
        </div>
        <ThemeToggle />
      </div>
    </div>
  );
};
