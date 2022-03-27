<template>
  <div class="grid">
    <div
      v-for="n in (maxImagesX * maxImagesY)"
      :key="n"
      style="width: 200px"
    >
      <PhotoHandler
        :imageSource="imageSources[n - 1]"
        :placeholderSource="placeholderSource"
      ></PhotoHandler>
    </div>
  </div>
</template>

<style>
  .grid {
    max-height: 100vh;
    display: grid;
    grid-auto-flow: column;
    grid-template-columns: repeat(auto-fill, 200px);
    grid-template-rows: repeat(auto-fill, 200px);
  }
</style>

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
    placeholderSource: require("@/assets/logo.svg"),
    currentPage: 0,
    maxImagesX: 0,
    maxImagesY: 0
  }),
  mounted() {
    //this.loadImages(10, 1);
    this.calculateMaxImages();
    window.addEventListener('resize', this.calculateMaxImages);
  },
  methods: {
    loadImages(amount, page) {
      const axios = require('axios');

      axios.get(`https://api.unsplash.com/topics/${this.topic}/photos?client_id=${this.$unSplashAPIKey}&per_page=${amount.toString()}&page=${page.toString()}`)
      .then(res => {
        console.log(res);

        const newSources = res.data.map((imageData) => imageData.urls.regular);
        this.imageSources.push(...newSources);
      })
    },
    calculateMaxImages() {
      const screenWidth = window.innerWidth;
      const screenHeight = window.innerHeight - 56;
      // Calculate the amount of images we can on the screen (including ones slightly obscured by the app borders)
      let maxImagesX = Math.ceil(screenWidth / 200);// + this.currentPage > 0 ? 1 : 0;
      const maxImagesY = Math.floor(screenHeight / 200);

      if (this.currentPage > 0) {
        // Increment the x-axis image count if we are not on page 1. This is to compensate for the image column visible to the left
        maxImagesX++;
      }

      const previousImageSourceCount = this.imageSources.length;
      const newImageSourceCount = maxImagesX * maxImagesY;

      if (newImageSourceCount > previousImageSourceCount) {
        const difference = newImageSourceCount - previousImageSourceCount;
        const page = previousImageSourceCount / difference + 1;
        console.log('page: ' + page);
        console.log('difference: ' + difference);
        this.loadImages(parseInt(difference), parseInt(page));
      }

      this.maxImagesX = maxImagesX;
      this.maxImagesY = maxImagesY;

      console.log('maxImagesX: ' + this.maxImagesX);
      console.log('maxImagesY: ' + this.maxImagesY);

      console.log('screenWidth: ' + screenWidth);
      console.log('screenHeight: ' + screenHeight);
    }
  }
}
</script>
