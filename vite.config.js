/// <reference types="vitest" />
/// <reference types="vite/client" />

import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import viteTsconfigPaths from 'vite-tsconfig-paths';
import path from 'path';

export default defineConfig({
  base: process.env.NODE_ENV === 'production' ? '/talk-and-travel-chat/' : '/',
  plugins: [
    react({
      babel: {
        plugins: [
          [
            'babel-plugin-styled-components',
            {
              displayname: true,
              filename: false,
            },
          ],
        ],
      },
    }),
    viteTsconfigPaths(),
  ],
  build: {
    commonjsOptions: {
      include: [/node_modules/],
    },
  },
  server: {
    // this ensures that the browser opens upon server start
    open: true,
    // this sets a default port to 3000
    port: 3000,
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
    preserveSymlinks: true,
  },
});
