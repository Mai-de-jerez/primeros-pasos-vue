import { createApp } from 'vue'
import App from './App.vue'
import Toast from 'vue-toastification'
import 'vue-toastification/dist/index.css'
import router from './router'
import './assets/main.css'
import { createPinia } from 'pinia'

const pinia = createPinia()
const app = createApp(App)

app.use(Toast, {
  position: 'top-center',
  timeout: 3000,
})

app.use(pinia)
app.use(router) 
app.mount('#app')
