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

    <v-navigation-drawer
      v-model="drawer"
      absolute
      bottom
      temporary
    >
      <v-list>
        <v-list-item-group v-model="topicSelectedIndex" @change="selectTopic(topicSelectedIndex)">
          <v-list-item
            v-for="(item, i) in topics"
            :key="i"
          >
            <v-list-item-content>
              <v-list-item-title v-text="item.title"></v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list-item-group>
      </v-list>
    </v-navigation-drawer>

    <v-main id="main">
      <div v-if="topicsObtained">
        <PhotoGrid 
          :topic="topicSelected" 
          :gridHeight="gridHeight"
          :canSelect="!drawer"
        >
        </PhotoGrid>
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
    drawer: false,
    topicsObtained: false,
    topicSelectedIndex: 0,
    topicSelected: '',
    topics: [

    ],
    gridHeight: 0
  }),
  mounted() {
    this.setGridHeight();
    window.addEventListener("resize", this.setGridHeight);
    window.addEventListener('keydown', this.detectKeyPress);

    const axios = require('axios');

    axios.get(`https://api.unsplash.com/topics?client_id=${this.$unSplashAPIKey}`)
    .then(res => {
      console.log(res);
      
      this.topics = res.data.map((topic) => {
        return {
          slug: topic.slug,
          title: topic.title
        };
      });
      this.selectTopic(0);
      this.topicsObtained = true;
    });
  },
  methods: {
    setGridHeight() {
      this.gridHeight = window.innerHeight - 64;
    },
    detectKeyPress(event) {
      if (event.keyCode === 27) {
        this.drawer = !this.drawer;
      }

      if (this.drawer === true) {
        if (event.keyCode === 38) {
          // up
          this.topicSelectedIndex--;
          if (this.topicSelectedIndex < 0) {
            this.topicSelectedIndex = 0;
          }
        } else if (event.keyCode === 40) {
          // down
          this.topicSelectedIndex++;
          if (this.topicSelectedIndex > 9) {
            this.topicSelectedIndex = 9;
          }
        }
      }
      this.selectTopic(this.topicSelectedIndex);
    },
    selectTopic(index) {
      this.topicSelected = this.topics[index];
    }
  }
};
</script>
