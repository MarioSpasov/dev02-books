/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    API_BASE_URL: process.env.API_BASE_URL,
    API_REGISTER_URL: process.env.API_REGISTER_URL,
    API_LOGIN_URL: process.env.API_LOGIN_URL,
    API_LOGOUT_URL: process.env.API_LOGOUT_URL,
    API_GET_ALL_BOOKS_URL: process.env.API_GET_ALL_BOOKS_URL,
    API_GET_SINGLE_BOOK_URL: process.env.API_GET_SINGLE_BOOK_URL,
  },
};

export default nextConfig;
