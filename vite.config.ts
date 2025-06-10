/// <reference types="vitest/config" />
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  base: "/",
  plugins: [react()],
  test: {
    globals: true,
    typecheck: {
      enabled: true,
    },
    include: ["src/**/__tests__/*.test.tsx"],
  },
});
