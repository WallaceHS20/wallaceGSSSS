import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  plugins: [react()],
  base: mode === 'production' ? '/SPC-Front/' : '/',
  server: {
    host: '0.0.0.0',
    port: 5173,
  }
}));
