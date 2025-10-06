import { defineConfig } from "vite";

export default defineConfig({
  base: "/",               // ensure absolute asset paths
  build: {
    outDir: "dist",
    sourcemap: true
  },
  server: {
    host: true,
    port: 5173
  },
  preview: {
    host: true,
    port: 4173
  },
  define: {
    "process.env": {}      // avoid process undefined errors on client
  }
});
