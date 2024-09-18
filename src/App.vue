<template>
  <v-app>
    <v-app-bar>
      <v-app-bar-nav-icon>
      </v-app-bar-nav-icon>

        <img alt="Vue logo" class="mt-2" src="@/assets/Windesheim_logo_ZG_RGB-DEF.png" height="75px"/>
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


      <v-btn>
      </v-btn>
    </v-app-bar>

    <v-main>
      <v-container>
        <v-row>
          <v-col
            v-for="n in 24"
            :key="n"
            cols="4"
          >
            <v-card height="200"></v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>
<script>
import { RouterLink, RouterView } from 'vue-router'
import moment from 'moment'
import axios from 'axios'
export default {
  name: "App",

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
        this.lastResponseTimestamp = new Date();
        this.sensors = response.data;
      });
    },
    getTime() {
      this.currentTime = moment().format("HH:mm:ss");
      this.lastUpdated = moment(this.lastResponseTimestamp)
        .fromNow();
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
