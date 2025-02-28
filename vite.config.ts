import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    include: ["react-datepicker"]
  },
  server: {
    proxy: {
      '/api': {
        target: 'https://task-manager-backend-upfr.onrender.com',
        changeOrigin: true,
        secure: false
      }
    }
  }
});
