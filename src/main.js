// import { createApp } from 'vue'
// import App from './App.vue'


// createApp(App).mount('#app')

import { createApp } from 'vue'
import App from './App.vue'
import Toast from 'vue-toastification'
import 'vue-toastification/dist/index.css'
import router from './router'

const app = createApp(App)

app.use(Toast, {
  position: 'top-center',
  timeout: 3000,
})

app.use(router) 
app.mount('#app')
