import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  root: '.',  // This tells Vite where to find index.html
  build: {
    outDir: 'build'
  },
  server: {
    port: 3000
  }
})