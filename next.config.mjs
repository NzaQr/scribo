const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  // The package index inlines all ~5,000 icons (16 MB in dev). Import each
  // icon from its own file so that every route loads only the icons it uses.
  modularizeImports: {
    "@hugeicons/core-free-icons": {
      transform: "@hugeicons/core-free-icons/{{member}}",
    },
  },
};

export default nextConfig;
