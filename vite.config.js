import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [
    react(),
    tailwindcss({
      theme: {
        extend: {
          colors: {
            primary: {
              dark: '#0d1b2a',
              light: '#1b263b',
            },
            accent: {
              blue: '#1f7a8c',
              lightblue: '#e0f7fa',
            },
          },
        },
      },
    }),
  ],
  base: '/marota-frontend/',
 
})
