import { defineConfig } from 'vite';
// import react from '@vitejs/plugin-react-swc';
import react from '@vitejs/plugin-react';
import path from 'path';
import { nodePolyfills } from 'vite-plugin-node-polyfills';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), nodePolyfills()],
  server: {
    host: true, // This makes the server listen on all local IPs
    port: 3000, // You can change this to any port you prefer
  },
  base: '/tontastic-wallet/',
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
});
