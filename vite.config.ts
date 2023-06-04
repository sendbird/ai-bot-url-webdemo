import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // to point to correct path for gh-pages
  base: '/ai-bot-url-webdemo',
  // https://github.com/rajinwonderland/react-code-blocks/issues/75
  // https://github.com/vitejs/vite/discussions/5912#discussioncomment-2908994
  // for code-blocks
  define: {
    // By default, Vite doesn't include shims for NodeJS/
    // necessary for segment analytics lib to work
    global: {},
  },
})
