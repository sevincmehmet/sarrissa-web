import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { fileURLToPath } from 'url'
import { dirname, resolve } from 'path'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src'),
    },
  },
  optimizeDeps: {
    include: ['@ckeditor/ckeditor5-build-classic'],
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          ckeditor: ['@ckeditor/ckeditor5-build-classic'],
        },
      },
    },
  },
  assetsInclude: ['**/*.svg'], // CKEditor bazı SVG ikonlar içerir
})
