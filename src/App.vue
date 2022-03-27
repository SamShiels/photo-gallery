<template>
  <v-app style="overflow: hidden">
    <v-app-bar
      app
      color="primary"
      style="height:64px"
    >
      <div class="d-flex align-center">
        <v-img
          alt="Vuetify Logo"
          class="shrink mr-2"
          contain
          src="https://cdn.vuetifyjs.com/images/logos/vuetify-logo-dark.png"
          transition="scale-transition"
          width="40"
        />

        <v-img
          alt="Vuetify Name"
          class="shrink mt-1 hidden-sm-and-down"
          contain
          min-width="100"
          src="https://cdn.vuetifyjs.com/images/logos/vuetify-name-dark.png"
          width="100"
        />
      </div>

      <v-spacer></v-spacer>

      <v-btn
        href="https://github.com/vuetifyjs/vuetify/releases/latest"
        target="_blank"
        text
      >
        <span class="mr-2">Latest Release</span>
        <v-icon>mdi-open-in-new</v-icon>
      </v-btn>
    </v-app-bar>

    <v-main id="main">
      <div>
        <PhotoGrid topic="wallpapers" :gridHeight="gridHeight"></PhotoGrid>
      </div>
    </v-main>
  </v-app>
</template>

<script>
import PhotoGrid from './components/PhotoGrid';

export default {
  name: 'App',

  components: {
    PhotoGrid,
  },

  data: () => ({
    gridHeight: 0
  }),
  mounted() {
    this.setGridHeight();
    window.addEventListener("resize", this.setGridHeight);
  },
  methods: {
    setGridHeight() {
      this.gridHeight = window.innerHeight - 64;
    }
  }
};
</script>
