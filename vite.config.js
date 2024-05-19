import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path';


const __dirname = import.meta.dirname;
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src') 
    }
  }
})
