import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@assets": "/src/assets", // Đặt alias cho assets
    },
  },
  optimizeDeps: {
    include: ["jwt-decode"], // Bao gồm thư viện vào giai đoạn dựng
  },
});
