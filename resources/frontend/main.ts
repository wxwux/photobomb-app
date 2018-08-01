import axios, { AxiosInstance } from "axios";
import SimpleVueValidation from "simple-vue-validator";
import Vue from "vue";
import VueAxiosPlugin from "vue-axios-plugin";
import App from "./App.vue";
import router from "./router";
import store from "./store";

Vue.use(SimpleVueValidation);
Vue.use(VueAxiosPlugin);

declare module "vue/types/vue" {
  interface Vue {
    $http: any;
    $validate?: any;
  }
}

declare module "vue/types/options" {
  interface ComponentOptions<V extends Vue> {
    validators?: object;
  }
}

const storeRequests: AxiosInstance = axios.create({
  baseURL: "/api",
  headers: {
    Authorization : `Bearer ${localStorage.getItem("token")}`
  }
});

store.$axios = storeRequests;

const PhotoApp: any = new Vue({
  el: "#app",
  render: (h) => h(App),
  router,
  store
});
