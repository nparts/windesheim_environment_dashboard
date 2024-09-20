<template>
  <v-card elevation="6">
    <v-card-item>
      <v-card-title>
        {{ sensor.name }}
      </v-card-title>
      <v-card-subtitle>
        {{ sensor.serial_number }}
      </v-card-subtitle>
      <v-card-text>
        <v-row>
          <v-col cols="6">
            <v-row>
              <div>
                <div class="text-h4">
                  <v-icon size="large">mdi-thermometer</v-icon>
                  {{ sensor.last_measurements[0].value }} °C
                </div>
                <div style="color: grey">
                  <v-icon color="grey">mdi-arrow-collapse-up</v-icon>
                  {{ sensor.aggregations.temperature.max_today }}
                  <v-icon color="grey">mdi-arrow-collapse-down</v-icon>
                  {{ sensor.aggregations.temperature.min_today }}
                </div>
              </div>
            </v-row>
          </v-col>
          <v-col cols="6">
            <v-row>
              <div>
                <div class="text-h4">
                  <v-icon size="large">mdi-water</v-icon>
                  {{ sensor.last_measurements[1].value }} %
                </div>
                <div style="color: grey">
                  <v-icon color="grey">mdi-arrow-collapse-up</v-icon>
                  {{ sensor.aggregations.humidity.max_today }}
                  <v-icon color="grey">mdi-arrow-collapse-down</v-icon>
                  {{ sensor.aggregations.humidity.min_today }}
                </div>
              </div>
            </v-row>
          </v-col>
        </v-row>
      </v-card-text>
      <v-card-actions>
        <v-icon>mdi-battery</v-icon>
        {{ sensor.last_measurements[2].value }}%
        <v-spacer></v-spacer>
        last update: {{ lastMeasurementTimestampRelative }}
      </v-card-actions>
    </v-card-item>
  </v-card>
</template>
<script>
import moment from 'moment'

export default {
    name: 'SensorCard',
    components: {},
    props: {
        sensor: {
            type: Object,
            default() {
                return {
                    id: null,
                    name: null,
                    serial_number: null,
                    last_measurements: [
                        {
                          type: null,
                          value: null,
                          unit: null,
                          timestamp: null
                        },
                    ],
                    aggregations: {
                      temperature: {
                        max_today: null,
                        min_today: null,
                        unit: "Celsius"
                      },
                      humidity: {
                        max_today: null,
                        min_today: null,
                        unit: "Percent"
                      }
                    },
                    last_measurement_timestamp: null,
                }
            }
        },
    },
    computed: {
      measurementColor() {
        return 'red'
      },
      lastMeasurementTimestampRelative() {
        return moment(this.sensor.last_measurement_timestamp).fromNow()
      }
    },
    methods: {},
    data() {
        return {
        }
    },
}
</script>

<style scoped></style>
