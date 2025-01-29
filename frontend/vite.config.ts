// vite.config.js
import { defineConfig } from "vite";
import { PluginOption } from "vite";
import react from "@vitejs/plugin-react";
import compression from "vite-plugin-compression";
import cssInjectedByJsPlugin from "vite-plugin-css-injected-by-js";
import { VitePWA } from "vite-plugin-pwa";
import path from "path";
import critical from "rollup-plugin-critical";
import { visualizer } from "rollup-plugin-visualizer";
import { createHtmlPlugin } from "vite-plugin-html";
import cssnano from "cssnano";
import progress from "vite-plugin-progress";

export default defineConfig({
  build: {
    assetsDir: "assets",
    rollupOptions: {
      treeshake: true,
      output: {
        manualChunks: {
          vendor: ["react", "react-dom"],
        },
        chunkFileNames: "assets/[name]-[hash].js",
        entryFileNames: "assets/[name]-[hash].js",
        assetFileNames: "assets/[name]-[hash].[ext]",
      },
    },
    minify: "terser",
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true,
      },
      format: {
        comments: false,
      },
      mangle: true,
    },
  },
  base: "/",
  css: {
    postcss: {
      plugins: [
        cssnano({
          preset: "default",
        }),
      ],
    },
  },

  plugins: [
    progress() as PluginOption,
    react({
      babel: {
        plugins: [["babel-plugin-styled-components", { displayName: true }]],
      },
    }) as PluginOption,
    critical({
      criticalBase: "./dist",
      criticalPages: [{ uri: "", template: "index" }],
    }) as PluginOption,
    visualizer({
      filename: "stats.html",
      open: true,
    }) as PluginOption,
    createHtmlPlugin({
      minify: true,
    }) as PluginOption,

    VitePWA({
      registerType: "autoUpdate",
      includeAssets: ["favicon.ico", "robots.txt", "icons/*.png"],
      workbox: {
        runtimeCaching: [
          {
            urlPattern: /\.(?:js|css|html|png|jpg|svg)$/,
            handler: "CacheFirst",
          },
        ],
      },
      manifest: {
        name: "My React Vite App",
        short_name: "ReactVitePWA",
        description: "A Progressive Web App built with Vite and React",
        theme_color: "#ffffff",
        background_color: "#ffffff",
        display: "standalone",
        // optimize these
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
    compression({
      algorithm: "brotliCompress",
      ext: ".br",
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
    proxy: {
      "/api": {
        target: "http://localhost:3002",
        changeOrigin: true,
        secure: false,
      },
    },
  },
});
