<template>
  <v-container>
    <v-img
      :src="imageSource"
      :lazy-src="placeholderSource"
      aspect-ratio="1"
      class="grey lighten-2"
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
  </v-container>
</template>

<script>
  export default {
    name: 'PhotoHandler',
    props: {
      imageSource: String,
      placeholderSource: String
    }
  }
</script>
