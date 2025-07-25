import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
  assetsInclude: ['**/*.mp4', '**/*.webm', '**/*.ogg'],
  server: {
    fs: {
      allow: ['..']
    }
  }
});
