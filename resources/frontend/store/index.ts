import Vue from "vue";
import Vuex, {StoreOptions} from "vuex";
import {RootState} from "./types";
Vue.use(Vuex);

import alerts from "./modules/alerts";
import user from "./modules/user";

const store: StoreOptions<RootState> = {
  modules: {
    alerts, user
  },
  state: {
    version: "1.0.0"
  }
};

export default new Vuex.Store<RootState>(store);
