import App from "./App.vue";
import axiosRequests from "./requests";
import router from "./router";
import store from "./store";
import SimpleVueValidation from "simple-vue-validator";
import Vue from "vue";
import VueAxiosPlugin from "vue-axios-plugin";

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

store.$axios = axiosRequests;

const PhotoApp: any = new Vue({
  el: "#app",
  render: h => h(App),
  router,
  store
});
