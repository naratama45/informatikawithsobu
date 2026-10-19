import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import { fileURLToPath } from 'node:url';
import { defineConfig } from 'vite';

export default defineConfig(({ command }) => {
  return {
    // In dev: serve from root '/'. In build: serve from GitHub repo subpath '/informatikawithsobu/'
    // This completely eliminates the 404 relative path bug when visiting without trailing slash on other devices.
    base: command === 'serve' ? '/' : (process.env.VITE_BASE_PATH || '/informatikawithsobu/'),
    plugins: [react(), tailwindcss()],
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('.', import.meta.url)),
      },
    },
    build: {
      outDir: 'dist',
      assetsDir: 'assets',
      target: 'es2018', // Transpile down to ES2018 for maximum compatibility on TVs and older mobile devices
      sourcemap: false,
    },
    server: {
      // HMR is disabled in AI Studio via DISABLE_HMR env var.
      hmr: process.env.DISABLE_HMR !== 'true',
      watch: process.env.DISABLE_HMR === 'true' ? null : {},
    },
  };
});
