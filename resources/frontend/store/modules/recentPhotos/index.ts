import { Module, MutationTree } from "vuex";
import { RootState } from "../../types";
import { RecentPhotosState } from "./types";

const namespaced: boolean = true;

const state: RecentPhotosState = {
  recentPhotos: {
    data: [],
    links: {
      next: ""
    }
  },
  photoInfo: {
    title: "",
    description: ""
  }
};

const mutations: MutationTree<RecentPhotosState> = {
};

const modals: Module<RecentPhotosState, RootState> = {
  namespaced,
  state,
  mutations
};

export default modals;
