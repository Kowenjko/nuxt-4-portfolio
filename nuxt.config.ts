// https://nuxt.com/docs/api/configuration/nuxt-config
import tailwindcss from '@tailwindcss/vite'

export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: false },
  css: ['~/assets/css/main.css'],
  ssr: true,
  modules: [
    '@nuxt/image',
    '@vueuse/nuxt',
    '@nuxt/fonts',
    'nuxt-swiper',
    'nuxt-typed-router',
    '@pinia/nuxt',
    'shadcn-nuxt',
  ],
  components: [
    {
      path: '~/components',
      pathPrefix: false,
    },
  ],
  imports: { dirs: ['composables/**'] },
  pinia: { storesDirs: ['./app/store/**'] },
  fonts: {
    families: [
      { name: 'Inter', provider: 'google' },
      { name: 'Geist', provider: 'google' },
    ],
  },
  vite: {
    plugins: [tailwindcss()],
  },
  shadcn: {
    prefix: '',
    componentDir: './app/components/ui',
  },
})
