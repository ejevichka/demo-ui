import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import path from 'path'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  server: {
    port: 3000,
    proxy: {
      '/krups-api': {
        target: 'https://api-g3d23mkdnq-ew.a.run.app',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/krups-api/, ''),
        configure: (proxy) => {
          proxy.on('proxyReq', (proxyReq, req) => {
            console.log('[VITE PROXY KRUPS] >>> ', req.method, req.url);
          });
          proxy.on('proxyRes', (proxyRes, req) => {
            console.log('[VITE PROXY KRUPS] <<<', proxyRes.statusCode, req.url);
          });
        },
      },
      '/bluemarket-api': {
        target: 'https://api-5snp6apu6a-ew.a.run.app',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/bluemarket-api/, ''),
        configure: (proxy) => {
          proxy.on('proxyReq', (proxyReq, req) => {
            console.log('[VITE PROXY BLUEMARKET] >>> ', req.method, req.url);
          });
          proxy.on('proxyRes', (proxyRes, req) => {
            console.log('[VITE PROXY BLUEMARKET] <<<', proxyRes.statusCode, req.url);
          });
        },
      },
    },
  },
})
