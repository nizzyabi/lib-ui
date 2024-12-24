import type { NextConfig } from "next";
import { withContentCollections } from "@content-collections/next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "startup-template-sage.vercel.app",
      },
    ],
  },
};

// withContentCollections must be the outermost plugin
export default withContentCollections(nextConfig);
