<template>
  <v-app fluid>
    <v-app-bar>

        <img alt="Windesheim Logo" class="mt-2 ml-2" src="@/assets/Windesheim_logo_ZG_RGB-DEF.png"/>
      <v-spacer></v-spacer>
      <h1
        class="text-uppercase"
        style="font-family: 'Roboto Mono', sans-serif"
      >
        {{ currentTime }}
      </h1>

      <v-spacer></v-spacer>
      <div>
        <h5>Laatst Geupdate</h5>
        <h5 class="font-weight-regular">{{ lastUpdated }}</h5>
      </div>


      <v-btn icon @click="getSensors">
        <v-icon>mdi-refresh</v-icon>
      </v-btn>
    </v-app-bar>

    <v-main>
      <v-container>
        <v-row>
          <v-col
            v-for="sensor in sensors"
            :key="sensor.id"
            cols="12"
            md="6"
            lg="4"
          >
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
  name: "App",
  components: { SensorCard },

  data: () => ({
    loading: false,

    sensors: [],

    currentTime: null,
    lastUpdated: null,

    lastResponseTimestamp: new Date()
  }),
  computed: {},
  methods: {
    getSensors() {
      this.$axios.get("/v1/sensors").then((response) => {
        this.lastResponseTimestamp = new Date()
        this.sensors = response.data.items
      });
    },
    getTime() {
      this.currentTime = moment().format("HH:mm:ss");
      this.lastUpdated = moment(this.lastResponseTimestamp).fromNow();
    },
  },
  created() {
    this.getSensors();
    setInterval(this.getTime, 1000);
  },
};
</script>


<style scoped>
</style>
