<template>
  <div>
    <v-dialog
      v-model="dialog"
      width="800"
      height="800"
    >
      <v-card>
        <v-img
          :src="imageSource"
          :lazy-src="imageSource"
          aspect-ratio="1"
          max-width="800"
          max-height="800"
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
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
  export default {
    name: 'PhotoEnlarger',
    props: {
      imageSource: String,
    },
    data: () => ({
      dialog: false,
    }),
    mounted() {
      window.addEventListener('keydown', this.detectKeyPress);
    },
    methods: {
      open() {
        this.dialog = true;
      },
      detectKeyPress(event) {
        if (this.dialog === false) {
          return;
        }
        if (event.keyCode === 27) {
          // escape
          this.dialog = false;
        }
      }
    }
  }
</script>
