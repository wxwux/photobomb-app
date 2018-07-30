import axios, { AxiosInstance } from "axios";
import Vue from "vue";
import VueAxiosPlugin from "vue-axios-plugin";
import App from "./App.vue";
import router from "./router";
import store from "./store";

Vue.use(VueAxiosPlugin);

declare module "vue/types/vue" {
  interface Vue {
    $http: any;
  }
}

const storeRequests: AxiosInstance = axios.create({
  baseURL: "/api"
});

store.$axios = storeRequests;

const PhotoApp: any = new Vue({
  el: "#app",
  render: (h) => h(App),
  router,
  store
});
