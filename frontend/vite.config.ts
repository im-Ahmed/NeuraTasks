import path from "path";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  server: {
    proxy: {
      // 1. Handle normal API requests (HTTP)
      "/api": {
        target: "http://localhost:8000", // Must be http://
        changeOrigin: true,
        secure: false,
      },
      // // 2. Handle WebSocket connection (Optional, since you connect directly in your code)
      // // If you were using a proxy for WS, it would look like this:
      // "/socket": {
      //   target: "ws://localhost:8000",
      //   ws: true,
      // },
    },
  },
});
