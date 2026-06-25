import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// base: './' makes the built asset paths relative so the app works when served
// from any sub-path (e.g. GitHub Pages project sites) or opened directly.
export default defineConfig({
  base: './',
  plugins: [react()],
})
