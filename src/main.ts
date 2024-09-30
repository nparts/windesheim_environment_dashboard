import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import '@mdi/font/css/materialdesignicons.css' // Ensure you are using css-loader

import * as signalR from '@microsoft/signalr';

// Vuetify
import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'

import moment from 'moment';
import axios from './plugins/axios'

// @ts-ignore
import App from './App.vue'
import router from './router'

const vuetify = createVuetify({
  icons: {
    defaultSet: 'mdi', // This is already the default value - only for display purposes
  },
  components,
  directives,
})

const connection = new signalR.HubConnectionBuilder()
  .withUrl('https://localhost:8888/sensorHub' ) // Replace with your SignalR server URL
  .withAutomaticReconnect() // Optional: enables automatic reconnection
  .configureLogging(signalR.LogLevel.Information) // Optional: configure logging level
  .build();

// Start the SignalR connection
connection.start()
  .then(() => {
    console.log('SignalR connection established.');
  })
  .catch(err => {
    console.error('Error while establishing SignalR connection: ', err);
  });

const app = createApp(App)
app.use(createPinia())
app.use(router)
app.use(vuetify)
app.use(moment)
app.use(axios, {
  baseUrl: 'https://localhost:8888',
})
// Optionally, you can attach the SignalR connection to the global app instance
app.config.globalProperties.$signalrConnection = connection;
app.mount('#app')


