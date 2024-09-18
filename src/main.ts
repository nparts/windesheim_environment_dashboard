import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

// Vuetify
import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'

import moment from 'moment'
moment.locale('nl')

import axios from './plugins/axios'

import App from './App.vue'
import router from './router'

const vuetify = createVuetify({
  components,
  directives,
})

const app = createApp(App)
app.use(createPinia())
app.use(router)
app.use(vuetify)
app.use(moment)
app.use(axios, {
  baseUrl: 'http://localhost:8888',
})
app.mount('#app')