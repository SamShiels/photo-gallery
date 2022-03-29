<template>
  <div v-bind:style="gridStyle">
    <div
      v-for="n in (maxImagesX * maxImagesY)"
      :key="n"
      style="width: 400px"
    >
      <PhotoHandler
        :imageSource="imageSources[n - 1 + currentPage * maxImagesY]"
        :placeholderSource="imageSources[n - 1 + currentPage * maxImagesY]"
        :selected="currentSelectedPhotoHandler === n - 1"
      ></PhotoHandler>
    </div>
    <PhotoSelector
      :maxWidth="maxImagesX"
      :maxHeight="maxImagesY"
      :canSelect="canSelect"
      v-on:arrowPressed="selectionChanged"
      v-on:spacePressed="enlargePhoto"
    ></PhotoSelector>
    <PhotoEnlarger
      ref="enlarger"
      :imageSource="imageSources[currentSelectedPhotoHandler + currentPage * maxImagesY]"
    ></PhotoEnlarger>
    <div
      style="text-shadow: 2px 2px 2px grey;
        position: absolute; padding: 10px; display: block; right: 50px; top:42vh;"
      >
      <v-icon dark x-large>
        mdi-arrow-right-bold-circle-outline
      </v-icon>
    </div>
      <div v-if="currentPage > 0"
      style="text-shadow: 2px 2px 2px grey;
        position: absolute; padding: 10px; display: block; left: 50px; top:42vh;"
      >
      <v-icon dark x-large>
        mdi-arrow-left-bold-circle-outline
      </v-icon>
    </div>
  </div>
</template>

<script>
import PhotoHandler from './PhotoHandler';
import PhotoSelector from './PhotoSelector';
import PhotoEnlarger from './PhotoEnlarger';

export default {
  name: 'PhotoGrid',

  components: {
    PhotoHandler,
    PhotoSelector,
    PhotoEnlarger,
  },
  props: {
    topic: Object,
    gridHeight: Number,
    canSelect: Boolean
  },
  data: () => ({
    imageSources: [],
    imageSourceTargetCount: 0,
    placeholderSource: require("@/assets/logo.svg"),
    currentPage: 0,
    maxImagesX: 0,
    maxImagesY: 0,

    // the current
    currentSelectedPhotoHandler: 0,

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
    },
    topic: function() {
      this.imageSources = [];
      this.imageSourceTargetCount = 0;
      this.currentPage = 0;
      this.calculateMaxImages();
    }
  },
  mounted() {
    this.calculateMaxImages();
    window.addEventListener('resize', this.calculateMaxImages);
  },
  methods: {
    loadImages(amount, page) {
      const axios = require('axios');
      this.imageSourceTargetCount += amount;

      axios.get(`https://api.unsplash.com/topics/${this.topic.slug}/photos?client_id=${this.$unSplashAPIKey}&per_page=${amount.toString()}&page=${page.toString()}`)
      .then(res => {
        const newSources = res.data.map((imageData) => imageData.urls.regular);
        this.imageSources.push(...newSources);
      });
    },
    calculateMaxImages() {
      const screenWidth = window.innerWidth;
      const screenHeight = window.innerHeight - 56;
      // Calculate the amount of images we can on the screen (including ones slightly obscured by the app borders)
      let maxImagesX = Math.ceil(screenWidth / 400);
      const maxImagesY = Math.floor(screenHeight / 400);

      const previousImageSourceCount = this.imageSourceTargetCount;
      const newImageSourceCount = (maxImagesX + this.currentPage) * maxImagesY;

      if (newImageSourceCount > previousImageSourceCount) {
        const difference = newImageSourceCount - previousImageSourceCount;
        const page = previousImageSourceCount / difference + 1;
        this.loadImages(parseInt(difference), parseInt(page));
      }

      this.maxImagesX = maxImagesX;
      this.maxImagesY = maxImagesY;
    },
    selectionChanged(x, y, pageAdvance) {
      this.currentPage = Math.max(0, this.currentPage + pageAdvance);
      this.currentSelectedPhotoHandler = y + x * (this.maxImagesY);
      this.calculateMaxImages();
    },
    enlargePhoto() {
      this.$refs.enlarger.open();
    }
  }
}
</script>
