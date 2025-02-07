import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: "/invitee/", // Change 'myapp' to your desired directory name
  build: {
    outDir: "dist/invitee", // Ensures built files are placed in 'dist/myapp'
  },
});
