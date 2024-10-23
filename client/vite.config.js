import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import { fileURLToPath } from "url";

// https://vitejs.dev/config/
const __filename = fileURLToPath(import.meta.url); // get the resolved path to the file
const __dirname = path.dirname(__filename); // get the name of the directory
export default defineConfig({
  plugins: [react()],
  alises: {
    "@": path.resolve(__dirname, "./src"),
    "@components": "./src/components/components.js",
    "@assets": "./src/assets",
  },
});
