import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify'

Vue.config.productionTip = false;
Vue.prototype.$unSplashAPIKey = "5vp6yWaJRI5q-_AyOuoo-w1BBJ6ma53uL8V8BggpMiU";

new Vue({
  vuetify,
  render: h => h(App)
}).$mount('#app')
