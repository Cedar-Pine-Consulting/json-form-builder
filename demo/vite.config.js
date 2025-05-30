import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  base: '/json-form-builder/',
  root: 'demo',
  server: {
    port: 3000,
  },
  resolve: {
    alias: {
      '@': '/src',
    },
  },
});
