import { createApp } from 'vue'
import PrimeVue from 'primevue/config'
import Aura from '@primeuix/themes/aura'
import { updateSurfacePalette } from '@primeuix/themes'
import App from './App.vue'
import router from './router'
import '@fontsource/inter/400.css'
import '@fontsource/inter/500.css'
import '@fontsource/inter/600.css'
import '@fontsource/inter/700.css'
import '@fontsource/inter/800.css'
import '@fontsource/inter/900.css'
import 'primeicons/primeicons.css'
import './styles/main.css'

const app = createApp(App)

app.use(router)
app.use(PrimeVue, {
  theme: {
    preset: Aura,
    options: {
      prefix: 'p',
      darkModeSelector: '.dark',
      cssLayer: false,
    },
  },

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

updateSurfacePalette({
  0: '#ffffff',
  50: '#faf5ff',
  100: '#f3e8ff',
  200: '#e9d5ff',
  300: '#d8b4fe',
  400: '#c084fc',
  500: '#a855f7',
  600: '#9333ea',
  700: '#7e22ce',
  800: '#6b21a8',
  900: '#581c87',
  950: '#3b0764',
})

app.mount('#app')
