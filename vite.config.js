import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import path from 'path';

export default defineConfig({
  plugins: [vue()],
  root: 'examples',
  build: {
    outDir: 'dist',
  },
  resolve: {
    alias: {
      "@/": path.resolve(__dirname, 'src')
    },
  },
  server: {
    port: 5173,
    fs: {
      strict: false, // 加入这一行
    },
  },
});
