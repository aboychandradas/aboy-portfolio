import type { NextConfig } from "next";

const securityHeaders = [
  {
    key: "X-Content-Type-Options",
    value: "nosniff",
  },
  {
    key: "Referrer-Policy",
    value: "strict-origin-when-cross-origin",
  },
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=()",
  },
  // Kept alongside the CSP below for older browsers. Browsers that support
  // frame-ancestors ignore X-Frame-Options when both headers are present.
  {
    key: "X-Frame-Options",
    value: "SAMEORIGIN",
  },
  // frame-ancestors only. No script-src: an untested one would break the two
  // inline JSON-LD blocks, and a nonce would require dynamic rendering.
  // Do not add default-src or style-src here — style-src without
  // 'unsafe-inline' silently breaks Framer Motion's inline style attributes.
  {
    key: "Content-Security-Policy",
    value: "frame-ancestors 'self'",
  },
];

const nextConfig: NextConfig = {
  poweredByHeader: false,
  async headers() {
    return [
      {
        source: "/:path*",
        headers: securityHeaders,
      },
    ];
  },
};

export default nextConfig;
