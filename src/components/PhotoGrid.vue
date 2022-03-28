<template>
  <div v-bind:style="gridStyle">
    <div
      v-for="n in (maxImagesX * maxImagesY)"
      :key="n"
      style="width: 400px"
    >
      <PhotoHandler
        :imageSource="imageSources[n - 1]"
        :placeholderSource="placeholderSource"
        :selected="selectedImageSource === n - 1"
      ></PhotoHandler>
      <PhotoSelector
       :maxWidth="maxImagesX"
       :maxHeight="maxImagesY"
       v-on:keypressed="selectionChanged"
      ></PhotoSelector>
    </div>
  </div>
</template>

<style>
  .grid {
    max-height: 100vh;
    display: grid;
    grid-auto-flow: column;
    grid-template-columns: repeat(auto-fill, 400px);
    grid-template-rows: repeat(auto-fill, 400px);
  }
</style>

<script>
import PhotoHandler from './PhotoHandler';
import PhotoSelector from './PhotoSelector';

export default {
  name: 'PhotoGrid',

  components: {
    PhotoHandler,
    PhotoSelector,
  },
  props: {
    topic: String,
    gridHeight: Number
  },
  data: () => ({
    imageSources: [],
    imageSourceTargetCount: 0,
    placeholderSource: require("@/assets/logo.svg"),
    currentPage: 0,
    maxImagesX: 0,
    maxImagesY: 0,

    selectedImageSource: 0,

    gridStyle: {
      maxHeight: '100vh',
      display: 'grid',
      gridAutoFlow: 'column',
      gridTemplateColumns: 'repeat(auto-fill, 400px)',
      gridTemplateRows: 'repeat(auto-fill, 400px)'
    }
  }),
  watch: {
    gridHeight: function(value) {
      // We inject a custom max height because CSS does not give us an accurate value for the view space.
      // This is because of html parenting.
      const valueString = value.toString()+'px';
      this.gridStyle.maxHeight = valueString;
    }
  },
  mounted() {
    //this.loadImages(10, 1);
    this.calculateMaxImages();
    window.addEventListener('resize', this.calculateMaxImages);
  },
  methods: {
    loadImages(amount, page) {
      const axios = require('axios');
      this.imageSourceTargetCount += amount;

      axios.get(`https://api.unsplash.com/topics/${this.topic}/photos?client_id=${this.$unSplashAPIKey}&per_page=${amount.toString()}&page=${page.toString()}`)
      .then(res => {
        console.log(res);

        const newSources = res.data.map((imageData) => imageData.urls.regular);
        this.imageSources.push(...newSources);
        console.log(this.imageSources.length);
      });
    },
    calculateMaxImages() {
      const screenWidth = window.innerWidth;
      const screenHeight = window.innerHeight - 56;
      // Calculate the amount of images we can on the screen (including ones slightly obscured by the app borders)
      let maxImagesX = Math.ceil(screenWidth / 400);
      const maxImagesY = Math.floor(screenHeight / 400);

      const previousImageSourceCount = this.imageSourceTargetCount;
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
    },
    selectionChanged(x, y) {
      console.log('New selection');
      console.log(x);
      console.log(y);

      this.selectedImageSource = y + x * (this.maxImagesY);
    }
  }
}
</script>
