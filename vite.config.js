import { defineConfig } from "vite";
export default defineConfig({
  base:
    process.env.NODE_ENV === "production"
      ? "https://misterh100.github.io/5050/"
      : "/",
});
