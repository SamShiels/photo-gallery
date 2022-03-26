<template>
  <v-container ref="container">
    <v-row>
      <v-col
        v-for="n in imageSources.length"
        :key="n"
        class="d-flex child-flex"
      >
        <PhotoHandler
          :imageSource="imageSources[n - 1]"
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
  props: {
    topic: String
  },
  data: () => ({
    imageSources: [],
    placeholderSource: require("@/assets/logo.svg")
  }),
  mounted() {
    this.loadImages('12', '3');
  },
  methods: {
    loadImages(amount, page) {
      const axios = require('axios');

      axios.get(`https://api.unsplash.com/topics/${this.topic}/photos?client_id=${this.$unSplashAPIKey}&per_page=${amount}&page=${page}`)
      .then(res => {
        console.log(res);

        this.imageSources = res.data.map((imageData) => imageData.urls.regular);
      })
    }
  }
}
</script>
