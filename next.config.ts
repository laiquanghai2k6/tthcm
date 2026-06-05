import { NextConfig } from "next";

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Cấu hình Turbopack để nhận diện đúng domain của ngrok cho WebSocket
  devIndicators: {
    appIsrStatus: true,
    buildActivity: true,
  },
  // Đây là nơi bạn cấu hình cho Turbopack thay vì viết vào webpack
  experimental: {
    turbo: {
      // Nếu sau này bạn cần cấu hình gì sâu hơn cho Turbopack thì viết ở đây
    }
  }
};

export default nextConfig;