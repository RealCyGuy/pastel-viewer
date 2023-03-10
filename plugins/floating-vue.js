import FloatingVue from "floating-vue";
import "floating-vue/dist/style.css";

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.use(FloatingVue, {
    themes: {
      "custom-tooltip": {
        $extend: "menu",
        $resetCss: true,
      },
      "custom-tooltip-higher": {
        $extend: "custom-tooltip",
      },
    },
  });
});
