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
    cors: true, // Allow all origins for development
    allowedHosts: ['localhost', '.ngrok-free.app', '.ngrok.io'],
    proxy: {
      '/krups-api': {
        target: 'https://api-g3d23mkdnq-ew.a.run.app',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/krups-api/, ''),
        configure: (proxy) => {
          proxy.on('proxyReq', (_proxyReq, req) => {
            console.log('[VITE PROXY KRUPS] >>> ', req.method, req.url);
          });
          proxy.on('proxyRes', (proxyRes, req, res) => {
            console.log('[VITE PROXY KRUPS] <<<', proxyRes.statusCode, req.url);
            // Add CORS headers for Shopify
            res.setHeader('Access-Control-Allow-Origin', req.headers.origin || '*');
            res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
            res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
            res.setHeader('Access-Control-Allow-Credentials', 'true');
          });
          // Handle preflight OPTIONS requests
          proxy.on('error', (err, _req, res) => {
            console.error('[VITE PROXY KRUPS] Error:', err.message);
            if (res && 'writeHead' in res) {
              res.writeHead(500, { 'Content-Type': 'text/plain' });
              res.end('Proxy error');
            }
          });
        },
      },
      '/bluemarket-api': {
        target: 'https://api-5snp6apu6a-ew.a.run.app',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/bluemarket-api/, ''),
        configure: (proxy) => {
          proxy.on('proxyReq', (_proxyReq, req) => {
            console.log('[VITE PROXY BLUEMARKET] >>> ', req.method, req.url);
          });
          proxy.on('proxyRes', (proxyRes, req) => {
            console.log('[VITE PROXY BLUEMARKET] <<<', proxyRes.statusCode, req.url);
          });
        },
      },
      '/beauty-api': {
        target: 'https://api-mrseanuz3a-ew.a.run.app',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/beauty-api/, ''),
        configure: (proxy) => {
          proxy.on('proxyReq', (_proxyReq, req) => {
            console.log('[VITE PROXY BEAUTY] >>> ', req.method, req.url);
          });
          proxy.on('proxyRes', (proxyRes, req) => {
            console.log('[VITE PROXY BEAUTY] <<<', proxyRes.statusCode, req.url);
          });
        },
      },
    },
  },
})
