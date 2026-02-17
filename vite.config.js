import { defineConfig } from "vite";
import { VitePWA } from "vite-plugin-pwa";

export default defineConfig({
  base:
    process.env.NODE_ENV === "production"
      ? "https://misterh100.github.io/5050/"
      : "/",
  // base: "/",
  plugins: [
    VitePWA({
      registerType: "autoUpdate",

      workbox: {
        globPatterns: ["**/*.{html,css,js,woff2,png,ico}"],
      },

      manifest: {
        name: "5050 Saving Challenge",
        short_name: "5050",
        description: "Save R5050 in 100 days",
        theme_color: "#2E7D6B",
        background_color: "#F7F9F8",
        display: "standalone",
        start_url: "/",
        icons: [
          {
            src: "/images/android-chrome-192x192.png",
            sizes: "192x192",
            type: "image/png",
          },
          {
            src: "/images/android-chrome-512x512.png",
            sizes: "512x512",
            type: "image/png",
          },
        ],
      },
    }),
  ],
});
