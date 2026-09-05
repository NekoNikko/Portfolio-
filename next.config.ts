import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // The portfolio is a content site served from a local PC (later behind a
  // Cloudflare Tunnel). Static exports would be ideal once fully static, but
  // keep the Node server for the public API + admin phases to come.
};

export default nextConfig;