export default {
  modules: [
    '@huntersofbook/naive-ui-nuxt',
    '@unocss/nuxt',
    // 引入 Pinia
    [
      '@pinia/nuxt',
      {
        autoImports: [
          // 自动引入 `defineStore(), storeToRefs()`
          'defineStore',
          'storeToRefs',
        ],
      },
    ],
  ],
  unocss: {
    uno: true, // enabled `@unocss/preset-uno`
    icons: true, // enabled `@unocss/preset-icons`
    attributify: true, // enabled `@unocss/preset-attributify`,
    // core options
    shortcuts: [],
    rules: [],
    safelist: [],
  },
}
