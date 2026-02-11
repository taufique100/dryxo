import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  
  return {
    plugins: [react()],
    server:{
      port:3000,
      proxy: {
        '/v1': {
          target: env.VITE_APP_REACT_APP_BASE_URL,
          changeOrigin: true,
          secure: false,
        }
      }
    }
  }
})