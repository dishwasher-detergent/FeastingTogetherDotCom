/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    REACT_APP_SUPABASE_KEY: process.env.REACT_APP_SUPABASE_KEY,
    REACT_APP_SUPABASE_URL: process.env.REACT_APP_SUPABASE_URL
  }
}

module.exports = nextConfig
