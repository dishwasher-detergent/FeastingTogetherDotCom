/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    REACT_APP_SUPABASE_KEY: process.env.REACT_APP_SUPABASE_KEY
  }
}

module.exports = nextConfig
