import { fileURLToPath, URL } from 'node:url'
import alias from '@rollup/plugin-alias'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  base:"/vue-project/",
    plugins: [
        vue(), alias()
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  }
})
