import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import path from "path";

export default defineConfig({
  define: {
    'process.env': {}
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
      "@components": path.resolve(__dirname, "./src/components"),
      "@lib": path.resolve(__dirname, "./src/lib"),
      "@icons": path.resolve(__dirname, "./src/icons"),
      "@mixins": path.resolve(__dirname, "./src/mixins")
    },
  },
  plugins: [
    vue(),
  ],
});
