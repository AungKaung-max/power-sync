import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import path from 'path'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(),tailwindcss()],
  base : "./",
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    }
  },
   server: {
    proxy: {
      "/service" : {
        target: "https://wap.kbzpay.com/",
        changeOrigin: true,
        secure: true,
      },
      "/baas" : {
        target: "https://wap.kbzpay.com/",
        changeOrigin: true,
        secure: true,
      },
    }
  }
})
// https://uat-miniapp.kbzpay.com

