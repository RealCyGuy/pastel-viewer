// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: [
    "@nuxtjs/tailwindcss",
    [
      "@nuxtjs/google-fonts",
      { families: { "Nunito+sans": [400], Rubik: [400, 600] } },
    ],
  ],
  runtimeConfig: {
    mongoURI: "",
  },
});
