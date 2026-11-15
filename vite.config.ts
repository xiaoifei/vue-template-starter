import path from 'node:path'
import { fileURLToPath } from 'node:url'
import tailwindcss from '@tailwindcss/vite'
import vue from '@vitejs/plugin-vue'
import { defineConfig } from 'vitest/config'

const rootDir = path.dirname(fileURLToPath(import.meta.url))

export default defineConfig({
  plugins: [vue(), tailwindcss()],
  resolve: { alias: { '@': path.resolve(rootDir, 'src') } },
  build: {
    rollupOptions: { output: { manualChunks: { vendor: ['vue', 'vue-router', 'pinia'] } } },
  },
  test: {
    environment: 'jsdom',
    setupFiles: ['./src/test/setup.ts'],
    coverage: {
      provider: 'v8',
      include: ['src/composables/**/*.ts', 'src/stores/**/*.ts'],
      thresholds: { branches: 60, functions: 60, lines: 60 },
    },
  },
})
