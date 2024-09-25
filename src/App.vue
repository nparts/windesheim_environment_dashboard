<template>
  <v-app fluid>
    <v-app-bar>
      <img alt="Windesheim Logo" class="mt-2 ml-2" src="@/assets/Windesheim_logo_ZG_RGB-DEF.png" />
      <v-spacer></v-spacer>
      <h1 class="text-uppercase" style="font-family: 'Roboto Mono', sans-serif">
        {{ currentTime }}
      </h1>

      <v-spacer></v-spacer>
      <template v-if="toggle === 0">
        <div>
          <h5>Laatst Geupdate</h5>
          <h5 class="font-weight-regular">{{ lastUpdated }}</h5>
        </div>
      </template>
      <template v-else-if="toggle === 1">
        <div style="color: red">
          <h4>LIVE</h4>
        </div>
      </template>
      <v-btn-toggle class="ml-5" v-model="toggle" divided>
        <v-btn icon="mdi-update"></v-btn>
        <v-btn icon="mdi-autorenew"></v-btn>
      </v-btn-toggle>
    </v-app-bar>
    <v-main>
      <v-progress-linear :indeterminate="loading"></v-progress-linear>

      <v-container>
        <v-toolbar flat class="mb-5">
          <v-toolbar-title>Sensoren</v-toolbar-title>
          <v-select
            v-model="field_selected"
            :items="fields"
            density="compact"
            item-title="text"
            item-value="value"
            hide-details
            dense
            @input="getSensors"
            style="max-width: 200px"
          >
          </v-select>
          <v-text-field
            v-model="field_value"
            density="compact"
            hide-details
            dense
            clearable
            v-on:keyup.enter="getSensors"
          ></v-text-field>
          <v-btn color="primary" class="mr-2" @click="getSensors">
            <v-icon>mdi-refresh</v-icon>
          </v-btn>
        </v-toolbar>
        <v-row>
          <v-col v-for="sensor in sensors" :key="sensor.id" cols="12" md="6" lg="4">
            <sensor-card :sensor="sensor" />
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>
<script>
import moment from 'moment'
import SensorCard from '@/components/SensorCard.vue'
export default {
  name: 'App',
  components: { SensorCard },

  data: () => ({
    loading: false,

    fields: [
      { text: 'Serial Number', value: 'serial_number' },
      { text: 'Name', value: 'name' }
    ],
    field_selected: 'serial_number',
    field_value: null,

    toggle: 0,
    sensors: [],

    currentTime: null,
    lastUpdated: null,

    lastResponseTimestamp: new Date()
  }),
  computed: {},
  methods: {
    periodicUpdate() {
      if (this.toggle === 0) {
        this.getSensors()
      }
    },
    getSensors() {
      this.loading = true
      const params = this.field_value ? `?${this.field_selected}=${this.field_value}` : ''
      this.$axios
        .get(`/sensor${params}`)
        .then((response) => {
          this.lastResponseTimestamp = new Date()
          this.sensors = response.data.items
        })
        .catch(() => {
          this.sensors = []
        })
        .finally(() => {
          this.loading = false
        })
    },
    getTime() {
      this.currentTime = moment().format('HH:mm:ss')
      this.lastUpdated = moment(this.lastResponseTimestamp).fromNow()
    }
  },
  created() {
    this.getSensors()
    setInterval(this.getTime, 1000)
    setInterval(this.periodicUpdate, 10000)
  },
  mounted() {
    // Access the SignalR connection from global properties
    const connection = this.$signalrConnection;

    // Example: listening to a SignalR event
    connection.on('ReceiveSensorData', (data) => {
      if (this.toggle === 1) {
        const index = this.sensors.findIndex((sensor) => sensor.id === data.id);
        if (index !== -1) {
          this.sensors[index] = data;
        }
        console.log(data);
      }
    });
  }
}
</script>

<style scoped></style>
