import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [react()],
	server: {
		cors: false,
		proxy: {
			'/raw': {
				target: 'https://pastebin.com/',
				changeOrigin: true,
				secure: true,
				rewrite: path => path.replace(/^\/raw/, ''),
			},
		},
	},
})
