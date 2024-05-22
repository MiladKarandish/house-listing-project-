import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';


// The '@' alias is defined here to map to the '/src' directory.
export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@': '/src',
    },
  },
});

