import { ActionTree, Module, MutationTree } from "vuex";
import { RootState } from "../../types";
import { Album } from "./types";

const namespaced: boolean = true;

const actions: ActionTree<Album, RootState> = {
  createNewAlbum(store, newAlbum: Album) {
    console.log("экшон альбум епту");
  }
};

const albums: Module<Album, RootState> = {
  namespaced,
  actions
};

export default albums;
