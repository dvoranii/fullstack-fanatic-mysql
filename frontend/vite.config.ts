// vite.config.js
import { defineConfig } from "vite";
import { PluginOption } from "vite";
import react from "@vitejs/plugin-react";
import compression from "vite-plugin-compression";
import cssInjectedByJsPlugin from "vite-plugin-css-injected-by-js";
import { VitePWA } from "vite-plugin-pwa";
import path from "path";
import dotenv from "dotenv";

const currentMode = process.env.NODE_ENV || "development";

dotenv.config({
  path: currentMode === "production" ? ".env.production" : ".env.development",
});

export default defineConfig(({ mode }) => {
  const isDevelopment = mode === "development";

  return {
    build: {
      assetsDir: "assets",
      rollupOptions: {
        output: {
          manualChunks: {
            vendor: ["react", "react-dom"],
            utils: ["lodash"],
          },
          chunkFileNames: "assets/[name]-[hash].js",
          entryFileNames: "assets/[name]-[hash].js",
          assetFileNames: "assets/[name]-[hash].[ext]",
        },
      },
      minify: "terser",
      terserOptions: {
        format: {
          comments: false,
        },
      },
    },
    base: "/",

    plugins: [
      react({
        babel: {
          plugins: [["babel-plugin-styled-components", { displayName: true }]],
        },
      }) as PluginOption,

      VitePWA({
        registerType: "autoUpdate",
        includeAssets: ["favicon.ico", "robots.txt", "icons/*.png"],
        manifest: {
          name: "My React Vite App",
          short_name: "ReactVitePWA",
          description: "A Progressive Web App built with Vite and React",
          theme_color: "#ffffff",
          background_color: "#ffffff",
          display: "standalone",
          icons: [
            {
              src: "/icons/icon-48x48.png",
              sizes: "48x48",
              type: "image/png",
            },
            {
              src: "/icons/icon-72x72.png",
              sizes: "72x72",
              type: "image/png",
            },
            {
              src: "/icons/icon-96x96.png",
              sizes: "96x96",
              type: "image/png",
            },
            {
              src: "/icons/icon-128x128.png",
              sizes: "128x128",
              type: "image/png",
            },
            {
              src: "/icons/icon-144x144.png",
              sizes: "144x144",
              type: "image/png",
            },
            {
              src: "/icons/icon-152x152.png",
              sizes: "152x152",
              type: "image/png",
            },
            {
              src: "/icons/icon-180x180.png",
              sizes: "180x180",
              type: "image/png",
            },
            {
              src: "/icons/icon-192x192.png",
              sizes: "192x192",
              type: "image/png",
            },
            {
              src: "/icons/icon-256x256.png",
              sizes: "256x256",
              type: "image/png",
            },
            {
              src: "/icons/icon-512x512.png",
              sizes: "512x512",
              type: "image/png",
            },
          ],
        },
      }) as PluginOption,

      compression({
        algorithm: "gzip",
        ext: ".gz",
        threshold: 10240,
        deleteOriginFile: false,
      }) as PluginOption,

      cssInjectedByJsPlugin() as PluginOption,
    ],

    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
      },
    },

    server: {
      proxy: isDevelopment
        ? {
            "/api": {
              target: "http://localhost:5000",
              changeOrigin: true,
              secure: false,
            },
          }
        : undefined,
    },
  };
});
