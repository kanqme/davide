import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from "path"
// Assumendo che componentTagger sia importato correttamente da qualche parte
// import componentTagger from '...' 

export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
  },
  plugins: [
    react(),
  ].filter(Boolean),
  base: '/davide/', // <--- AGGIUNGI LA RIGA QUI
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
}));
