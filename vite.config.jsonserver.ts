// file: my-react-project/vite.config.js (and any other vite.config.xyz.js file)
/// <reference types="vitest" />
/// <reference types="vite/client" />
import reactRefresh from "@vitejs/plugin-react-refresh";
import { defineConfig } from "vite";
import { fileURLToPath, URL } from "url";
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [reactRefresh()],
  envDir: "./src/",
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
  server: {
    port: 3000,
    origin: "http://localhost:3000",
    open: "http://localhost:3000",
    proxy: {
      "/jsonserver": {
        target: "http://localhost:3111",
        changeOrigin: true,
        secure: false,
        ws: false,
        rewrite: (path) => path.replace(/^\/jsonserver/, ""),
      },
    },
  },

  test: {
    globals: true,
    environment: "jsdom",
    exclude: ["node_modules"],
  },
});
