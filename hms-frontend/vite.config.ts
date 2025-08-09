import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [
    tailwindcss(),
  ],

  // Entry points for Vite
  build: {
    // Output to Django's static directory
    outDir: '../static/dist',

    // Clean the output directory before build
    emptyOutDir: true,

    // Disable file name hashing for predictable names
    rollupOptions: {
      input: {
        main: './src/main.js',
        style: './src/style.css'
      },
      output: {
        entryFileNames: '[name].js',
        chunkFileNames: '[name].js',
        assetFileNames: '[name][extname]'
      }
    },

    // Minify in production, but keep readable during development
    minify: 'esbuild',

    // Generate source maps for easier debugging
    sourcemap: true
  },

  // Configure the dev server (optional, for serving during development)
  server: {
    port: 3000,
    open: false
  }
  ,
   assetsInclude: ['**/*.woff2', '**/*.woff', '**/*.ttf']
})