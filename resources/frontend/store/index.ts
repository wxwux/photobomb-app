import Vue from "vue";
import Vuex, { Store, StoreOptions } from "vuex";
import { RootState } from "./types";

Vue.use(Vuex);

import alerts from "./modules/alerts";
import user from "./modules/user";

class RootStore<S> extends Store<S> {
  public $axios: any;
}


const store: StoreOptions<RootState> = {
  modules: {
    alerts,
    user
  }
};

export default new RootStore<RootState>(store);
