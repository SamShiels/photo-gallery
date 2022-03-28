<template>
  <div >
    <v-img
      :src="imageSource"
      :lazy-src="placeholderSource"
      aspect-ratio="1"
      max-width="400"
      max-height="400"
      v-bind:style="image"
    >
      <template v-slot:placeholder>
        <v-row
          class="fill-height ma-0"
          align="center"
          justify="center"
        >
          <v-progress-circular
            indeterminate
            color="grey lighten-5"
          ></v-progress-circular>
        </v-row>
      </template>
    </v-img>
  </div>
</template>

<script>
  export default {
    name: 'PhotoHandler',
    props: {
      imageSource: String,
      placeholderSource: String,
      selected: Boolean
    },
    watch: {
      selected: function(value) {
        this.image.border = value ? "8px solid rgb(50, 87, 153)" : "";
      }
    },
    data: () => ({
      image: {
        border: "",
      }
    }),
    mounted() {
      this.image.border = this.selected ? "8px solid rgb(50, 87, 153)" : "";
    }
  }
</script>
