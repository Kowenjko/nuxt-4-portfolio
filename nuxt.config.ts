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
    'v-gsap-nuxt',
    '@nuxt/icon',
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
    families: [{ name: 'Inter', provider: 'google' }],
  },
  app: {
    head: {
      charset: 'utf-8',
      viewport:
        'width=device-width, height=device-height, initial-scale=1.0, user-scalable=0, minimum-scale=1.0, maximum-scale=1.0',
      link: [
        {
          rel: 'icon',
          type: 'image/png',
          href: '/my-logo-light.png',
          sizes: '16x16',
        },
      ],
    },
  },
  vite: {
    plugins: [tailwindcss()],
  },
  shadcn: {
    prefix: '',
    componentDir: './app/components/ui',
  },
  icon: {
    provider: 'iconify',
    customCollections: [{ prefix: 'my-icon', dir: 'assets/icons' }],
    mode: 'svg',
    size: '1.5rem',
  },
  runtimeConfig: {
    mailtrapToken: process.env.NUXT_MAILTRAP_TOKEN,
    mailtrapEndpoint: process.env.NUXT_MAILTRAP_ENDPOINT,
    mailtrapTemplate: process.env.NUXT_MAILTRAP_TEMPLATE,
    mailtrapRecipient: process.env.NUXT_MAILTRAP_RECIPIENT,
    telegramUrl: process.env.NUXT_TELEGRAM_URL,
    resendApiKey: process.env.NUXT_RESEND_API_KEY,
    clientUrl: process.env.NUXT_CLIENT_URL,
  },
})
