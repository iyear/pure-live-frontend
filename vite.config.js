// import built-in modules
import * as path from 'path';
// import third-party modules
import vue from '@vitejs/plugin-vue2';
import { defineConfig } from 'vite';
import progress from 'vite-plugin-progress';
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    progress(),
    vue(),
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
  },
});
