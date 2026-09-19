import { createApp } from 'vue'
import ui from '@nuxt/ui/vue-plugin'
import App from './App.vue'
import router from './router'
import { vReveal } from './directives/reveal'
import '@fontsource/inter/400.css'
import '@fontsource/inter/500.css'
import '@fontsource/inter/600.css'
import '@fontsource/inter/700.css'
import '@fontsource/inter/800.css'
import '@fontsource/inter/900.css'
import './styles/main.css'

const app = createApp(App)

app.directive('reveal', vReveal)
app.use(router)
app.use(ui)

app.mount('#app')
