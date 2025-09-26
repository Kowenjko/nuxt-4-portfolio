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
          href: '/images/logo-dark.png',
          sizes: '32x32',
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
        name: 'Русская',
        iso: 'ru-RU',
        language: 'ru-RU',
        file: 'ru.json',
      },
    ],
    detectBrowserLanguage: {
      useCookie: true,
      cookieKey: 'i18n_redirected',
      redirectOn: 'root',
      alwaysRedirect: false,
      fallbackLocale: 'en',
    },
  },
  icon: {
    provider: 'iconify',
    customCollections: [{ prefix: 'my-icon', dir: 'assets/icons' }],
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
    },
  },
})
