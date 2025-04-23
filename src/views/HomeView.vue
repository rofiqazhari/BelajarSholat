<script setup lang="ts"></script>

<template>
  <v-container>
    <v-row align="center" justify="center">
      <v-col cols="12" sm="6" md="5" lg="4" xl="3">
        <v-row justify="center">
          <v-col cols="4" md="5">
            <v-img src="/logo.png" aspect-ratio="1">
              <template #placeholder>
                <v-row class="fill-height ma-0" align="center" justify="center">
                  <v-progress-circular indeterminate color="grey lighten-5" />
                </v-row>
              </template>
            </v-img>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
    <v-row align="center" justify="center">
      <v-col cols="12" sm="6" md="5" lg="4" xl="3" class="text-bold">
        Kenapa ikut Academy Belajar Sholat ini?
      </v-col>
    </v-row>
  </v-container>

  <v-carousel>
    <v-carousel-item src="https://cdn.vuetifyjs.com/images/cards/docks.jpg" cover></v-carousel-item>

    <v-carousel-item src="https://cdn.vuetifyjs.com/images/cards/hotel.jpg" cover></v-carousel-item>

    <v-carousel-item
      src="https://cdn.vuetifyjs.com/images/cards/sunshine.jpg"
      cover
    ></v-carousel-item>
  </v-carousel>
</template>
<script setup>
import { ref } from "vue";

const length = ref(3);
const onboarding = ref(1);

function next() {
  onboarding.value = onboarding.value + 1 > length.value ? 1 : onboarding.value + 1;
}
function prev() {
  onboarding.value = onboarding.value - 1 <= 0 ? length.value : onboarding.value - 1;
}
</script>
