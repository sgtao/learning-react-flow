import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // for path alias
  resolve: {
    alias: {
      '@/': `${__dirname}/src/`,
      '~/': `${__dirname}/public/`,
    },
  },
});
