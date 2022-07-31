// import built-in modules
import * as path from 'path';
// import third-party modules
import vue from '@vitejs/plugin-vue2';
import { defineConfig } from 'vite';
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
  },
});
