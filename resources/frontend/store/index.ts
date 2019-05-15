import Vue from "vue";
import Vuex, { Store, StoreOptions } from "vuex";
import { RootState } from "./types";

Vue.use(Vuex);

import albums from "./modules/albums";
import alerts from "./modules/alerts";
import modals from "./modules/modals";
import user from "./modules/user";
import photos from "./modules/photos";

class RootStore<S> extends Store<S> {
  public $axios: any;
}


const store: StoreOptions<RootState> = {
  modules: {
    alerts,
    user,
    albums,
    modals,
    photos
  }
};

export default new RootStore<RootState>(store);
