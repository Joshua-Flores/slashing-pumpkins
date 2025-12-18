import { createApp } from 'vue'
import PrimeVue from 'primevue/config'
import Nora from '@primevue/themes/nora'
import Ripple from 'primevue/ripple'
import App from './App.vue'
import router from './router'
import '@fontsource/inter/400.css'
import '@fontsource/inter/500.css'
import '@fontsource/inter/600.css'
import '@fontsource/inter/700.css'
import '@fontsource/inter/800.css'
import '@fontsource/inter/900.css'
import './assets/main.css'

const app = createApp(App)

app.use(router)
app.use(PrimeVue, {
  theme: {
    preset: Nora,
    options: {
      prefix: 'p',
      darkModeSelector: '.dark',
      cssLayer: false,
    },
  },
  ripple: true,
  pt: {
    global: {
      css: `
        :root {
          --p-primary-50: #fff7ed;
          --p-primary-100: #ffedd5;
          --p-primary-200: #fed7aa;
          --p-primary-300: #fdba74;
          --p-primary-400: #fb923c;
          --p-primary-500: #f97316;
          --p-primary-600: #ea580c;
          --p-primary-700: #c2410c;
          --p-primary-800: #9a3412;
          --p-primary-900: #7c2d12;
          --p-primary-950: #431407;
        }
      `,
    },
  },
})
app.directive('ripple', Ripple)

app.mount('#app')
