import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    proxy: {
      "/api": {
        target: "http://144.217.243.153:8005",
        changeOrigin: true,
        secure: false,
        rewrite: (path) => path,
      },
      "/uploads": {
        target: "http://144.217.243.153:8005",
        changeOrigin: true,
        secure: false,
      },
      "/static": {
        target: "http://144.217.243.153:8005",
        changeOrigin: true,
        secure: false,
      },
    },
  },
});
