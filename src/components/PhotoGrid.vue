<template>
  <v-container>
    <v-row>
      <v-col
        v-for="n in 9"
        :key="n"
        class="d-flex child-flex"
        cols="4"
      >
        <PhotoHandler
          :imageSource="imageSources[n]"
          :placeholderSource="placeholderSource"
        ></PhotoHandler>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import PhotoHandler from './PhotoHandler';

export default {
  name: 'PhotoGrid',

  components: {
    PhotoHandler,
  },
  data: () => ({
    imageSources: [],
    placeholderSource: require("@/assets/logo.svg")
  }),
  mounted() {
    const axios = require('axios');

    axios
      .get(`https://api.unsplash.com/topics/wallpapers/photos?client_id=${this.$unSplashAPIKey}`)
      .then(res => {
        console.log(res);

        this.imageSources = res.data.map((imageData) => imageData.urls.regular);
      })
  }
}
</script>
