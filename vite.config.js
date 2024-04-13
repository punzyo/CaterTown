import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path';


const __dirname = import.meta.dirname;
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src') // 设置 @ 符号的别名为 src 目录
    }
  }
})
