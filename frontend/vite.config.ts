import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 3000,

    // --- ADD THIS PROXY CONFIGURATION ---
    // This is the part that fixes the 404 error.
    proxy: {
      // This rule says: if a request starts with "/api"...
      '/api': {
        // ...then forward it to our backend server running on port 5000.
        target: 'http://localhost:5000',

        // This is important for preventing potential CORS issues.
        changeOrigin: true,
      },
    },
    // ------------------------------------
  },
  plugins: [react(), mode === "development" && componentTagger()].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
}));