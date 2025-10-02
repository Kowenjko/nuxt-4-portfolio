// https://nuxt.com/docs/api/configuration/nuxt-config
import tailwindcss from '@tailwindcss/vite'
import { dark, shadcn } from '@clerk/themes'

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
    '@nuxtjs/i18n',
    '@clerk/nuxt',
    'convex-nuxt',
    'nuxt-jsonld',
    'nuxt-rating',
    '@nuxtjs/color-mode',
  ],
  components: [
    {
      path: '~/components',
      pathPrefix: false,
    },
  ],
  nitro: {
    compressPublicAssets: true,
    routeRules: {
      '/**': { swr: 60 * 60 * 24 },
    },
  },
  experimental: {
    defaults: {
      nuxtLink: {
        trailingSlash: 'append', // can be 'append' or 'remove'
      },
    },
    payloadExtraction: true,
    renderJsonPayloads: true,
    asyncEntry: true, // Асинхронний entrypoint → швидше FCP
  },
  imports: { dirs: ['composables/**'] },
  pinia: { storesDirs: ['./app/store/**'] },
  colorMode: {
    classSuffix: '',
    preference: 'dark',
    fallback: 'dark',
    storageKey: 'nuxt-color-mode',
  },
  fonts: {
    families: [{ name: 'Inter', provider: 'google' }],

    defaults: {
      weights: [400, 600, 700],
      subsets: ['latin', 'cyrillic'],
    },
  },
  image: {
    format: ['webp', 'avif'],
    quality: 70,
    provider: 'vercel',
    screens: {
      sm: 240,
      md: 320,
      lg: 384,
      xl: 512,
      '2xl': 768,
    },
    presets: {
      hero: {
        modifiers: {
          fit: 'cover',
          width: 384,
          height: 512,
        },
      },
    },
  },

  app: {
    baseURL: '/',
    head: {
      htmlAttrs: { lang: 'en' },
      charset: 'utf-8',
      viewport: 'width=device-width, height=device-height, initial-scale=1.0,  minimum-scale=1.0, maximum-scale=5.0',
      link: [
        { rel: 'icon', type: 'image/png', href: '/images/logo-dark.png', sizes: '32x32' },
        { rel: 'canonical', href: process.env.NUXT_CLIENT_URL },
      ],
    },
  },
  vite: {
    plugins: [tailwindcss()],
  },
  build: {
    transpile: ['@clerk/nuxt'], // щоб Clerk нормально працював у SSR
    extractCSS: true,
  },
  shadcn: {
    prefix: '',
    componentDir: './app/components/ui',
  },
  clerk: {
    appearance: {
      baseTheme: shadcn,
    },
  },
  convex: {
    url: process.env.CONVEX_URL,
  },
  i18n: {
    baseUrl: process.env.NUXT_CLIENT_URL,
    langDir: 'locales',
    strategy: 'no_prefix', //no_prefix prefix_except_default
    customRoutes: 'config',
    compilation: { strictMessage: false, escapeHtml: false },
    defaultLocale: 'en',
    vueI18n: './i18n.config.ts',
    locales: [
      {
        code: 'en',
        name: 'English',
        iso: 'en-EN',
        language: 'en-EN',
        file: 'en.json',
      },
      {
        code: 'ua',
        name: 'Українська',
        iso: 'uk-UA',
        language: 'uk-UA',
        file: 'uk.json',
      },
      {
        code: 'ru',
        name: 'Русский',
        iso: 'ru-RU',
        language: 'ru-RU',
        file: 'ru.json',
      },
    ],
  },
  icon: {
    provider: 'iconify',
    customCollections: [{ prefix: 'my-icon', dir: './app/assets/icons' }],
    mode: 'svg',
    size: '1.5rem',
  },
  runtimeConfig: {
    clerkSecretKey: process.env.NUXT_CLERK_SECRET_KEY,
    mailtrapToken: process.env.NUXT_MAILTRAP_TOKEN,
    mailtrapEndpoint: process.env.NUXT_MAILTRAP_ENDPOINT,
    mailtrapTemplate: process.env.NUXT_MAILTRAP_TEMPLATE,
    mailtrapRecipient: process.env.NUXT_MAILTRAP_RECIPIENT,
    telegramUrl: process.env.NUXT_TELEGRAM_URL,
    resendApiKey: process.env.NUXT_RESEND_API_KEY,
    clientUrl: process.env.NUXT_CLIENT_URL,

    public: {
      clerkPublishableKey: process.env.NUXT_PUBLIC_CLERK_PUBLISHABLE_KEY,
      clerkAppDomain: process.env.CLERK_APP_DOMAIN,
      crispWebsiteId: process.env.NUXT_CRISP_WEBSITE_ID,
      clientUrl: process.env.NUXT_CLIENT_URL,
      adminUserId: process.env.NUXT_ADMIN_USER_ID,
    },
  },
})
