import Vue from "vue";
import VueAxiosPlugin from "vue-axios-plugin";
import App from "./App.vue";
import router from "./router";

Vue.use(VueAxiosPlugin);

declare module "vue/types/vue" {
  interface Vue {
      $http: any;
  }
}

const PhotoApp: object = new Vue({
  el: "#app",
  render: (h) => h(App),
  router,
});

