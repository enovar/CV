import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 10000,
    headers: {
      'Content-Security-Policy': "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval' https://challenges.cloudflare.com https://static.cloudflareinsights.com; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src 'self' https://fonts.gstatic.com; connect-src 'self' https://formspree.io https://challenges.cloudflare.com https://cloudflareinsights.com; frame-src https://challenges.cloudflare.com; img-src 'self' data: blob: https://images.unsplash.com; worker-src blob: https://challenges.cloudflare.com; child-src blob: https://challenges.cloudflare.com;",
    },
  },
})
