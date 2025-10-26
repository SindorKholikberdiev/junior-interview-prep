import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig(({ command }) => {
  // 'command' bizga 'serve' (npm run dev) yoki 'build' (npm run build) ekanligini aytadi

  // Agar 'build' buyrug'i bo'lsa (ya'ni deploy uchun),
  // 'base' manzilini repository nomiga tenglaymiz.
  // Aks holda ('serve' paytida), 'base' ildiz ('/') bo'ladi.
  const base = command === "build" ? "/junior-interview-prep/" : "/";

  return {
    base: base,
    plugins: [react()],
  };
});
