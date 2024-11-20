import { defineConfig } from 'vite';

export default defineConfig({
  resolve: {
    alias: {
      '@data': '/src/data_files'
    }
  }
});
