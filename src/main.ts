import Vue from "vue";
import App from "./App.vue";
import router from "./router";

const PhotoApp: object = new Vue({
  el: "#app",
  render: (h) => h(App),
  router,
});
