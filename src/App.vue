<template>
  <v-app style="overflow: hidden">
    <v-app-bar
      app
      color="primary"
      dark
      style="height:64px"
    >
      <div class="d-flex align-center">
        <v-toolbar-title
          color="white"
        >{{ topicSelected.title }}</v-toolbar-title>
      </div>

      <v-spacer></v-spacer>

      <v-btn
        href="https://github.com/SamShiels/photo-gallery"
        target="_blank"
        text
      >
        <span class="mr-2">Source</span>
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
      if (event.keyCode === 9) {
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
