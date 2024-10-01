import { defineConfig } from 'vite';
// import react from '@vitejs/plugin-react-swc';
import react from '@vitejs/plugin-react';
import path from 'path';
import { nodePolyfills } from 'vite-plugin-node-polyfills';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), nodePolyfills()],
  base: '/tontastic-wallet/',
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
});
