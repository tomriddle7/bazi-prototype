import { defineConfig, loadEnv } from 'vite'
import path from 'path'
import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'

const __dirname = path.resolve();

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd());
  const base = env.VITE_BASE_URL
    ? env.VITE_BASE_URL.endsWith('/')
      ? env.VITE_BASE_URL
      : `${env.VITE_BASE_URL}/`
    : '/';

  return {
    plugins: [
      react(),
      tailwindcss(),
      VitePWA({
        registerType: 'autoUpdate',
        pwaAssets: {
          disabled: false,
          config: false,
          preset: 'minimal-2023',
          image: 'public/favicon.svg',
          includeHtmlHeadLinks: true,
          overrideManifestIcons: true,
          injectThemeColor: true,
        },
        manifest: {
          id: base,
          name: 'bazi-prototype',
          short_name: '사주 만세력',
          description: '사주 만세력 입력 및 조회 웹앱',
          start_url: base,
          scope: base,
          display: 'standalone',
          orientation: 'portrait',
          prefer_related_applications: false,
        },
        devOptions: {
          enabled: true,
        },
      }),
    ],
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
      },
    },
    server: {
      host: true,
    },
    build: {
      sourcemap: false,
    },
    base,
  };
})
