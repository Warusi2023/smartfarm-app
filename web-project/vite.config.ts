import { defineConfig } from "vite";

export default defineConfig({
  base: "/",
  build: { 
    outDir: "dist", 
    sourcemap: true 
  },
  define: {
    "process.env": {}
  },
  envPrefix: ['VITE_', 'NEXT_PUBLIC_', 'REACT_APP_']
});