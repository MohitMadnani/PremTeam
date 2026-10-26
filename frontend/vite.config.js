import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')
  return {
    plugins: [react()],
    build: { outDir: 'build' },
    server: {
      port: 3000,
      // In dev the browser calls /api on this server, which forwards to the backend.
      proxy: { '/api': env.VITE_PROXY_TARGET || 'http://localhost:8080' },
    },
  }
})
