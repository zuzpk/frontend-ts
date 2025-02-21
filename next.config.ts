import type { NextConfig } from "next";
import { env } from "process";

const nextConfig: NextConfig = {

  async rewrites(){
    return [
      { source: "/@/:method*/:action*", destination: "http://localhost:3001/@/:method*/:action*" },
      { source: "/@/:method*", destination: "http://localhost:3001/@/:method*" }
    ]
  },
  distDir: ".next.dev",
  cleanDistDir: true,
  poweredByHeader: false,
  images: {
    loader: 'custom',
    loaderFile: './imgloader.ts',
    remotePatterns: [
        {
            protocol: "https",
            hostname: "*"
        }
    ]
  },
  sassOptions: {
    silenceDeprecations: ['legacy-js-api'],
  },
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production' ? { exclude: ['error'] } : false,
    reactRemoveProperties: true,
  },

  // Experimental TypeScript features
  experimental: {
    // Enable type-checked routing
    typedRoutes: true,
    
    // Enable server actions
    serverActions: {
      bodySizeLimit: '1mb',
      allowedOrigins: ['*']
    },
  },

  // Performance and build optimizations
  productionBrowserSourceMaps: false,
  reactStrictMode: false

};

export default nextConfig;