const {
  withHydrationOverlay,
} = require("@builder.io/react-hydration-overlay/next");

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "files.edgestore.dev",
      },
    ],
  },
};

// module.exports = withHydrationOverlay({
//   appRootSelector: "main",
// })(nextConfig);

module.exports = nextConfig;
