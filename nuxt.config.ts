export default defineNuxtConfig({
  devtools: {
    enabled: true,
  },
  app: {
    pageTransition: { name: 'page', mode: 'out-in' },
    layoutTransition: { name: 'layout', mode: 'out-in' },
  },
  modules: [
    '@huntersofbook/naive-ui-nuxt',
    '@unocss/nuxt',
    '@pinia/nuxt',
    '@pinia-plugin-persistedstate/nuxt',
  ],
  pinia: {
    autoImports: [
      'defineStore',
      'storeToRefs',
    ],
  },
  piniaPersistedstate: {
    storage: 'localStorage',
  },
  unocss: {
    uno: true, // enabled `@unocss/preset-uno`
    icons: true, // enabled `@unocss/preset-icons`
    attributify: true, // enabled `@unocss/preset-attributify`,
    // core options
    shortcuts: [],
    rules: [],
    safelist: [],
  },
})
