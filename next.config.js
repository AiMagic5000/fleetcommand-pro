/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "standalone",
  poweredByHeader: false,
  reactStrictMode: true,
  async redirects() {
    return [
      { source: "/index.html", destination: "/", permanent: true },
      { source: "/fcp-dashboard.html", destination: "/dashboard", permanent: false },
    ]
  },
}

module.exports = nextConfig
