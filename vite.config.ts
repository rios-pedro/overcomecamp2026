import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: '/', // <--- ISSO DAQUI garante que os scripts usem caminhos absolutos
})
