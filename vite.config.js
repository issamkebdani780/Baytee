import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [tailwindcss(), react()],
  server: {
    proxy: {
      // During dev, forward /api/* → backend
      '/api': {
        target: 'http://109.123.250.140:3001',
        changeOrigin: true,
        secure: false,
      },
    },
  },
})
