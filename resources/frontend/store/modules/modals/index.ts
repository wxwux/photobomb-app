import { Module, MutationTree } from "vuex";
import { RootState } from "../../types";
import { ModalsState } from "./types";

const namespaced: boolean = true;

const state: ModalsState = {
  currentModal: ""
};

const mutations: MutationTree<ModalsState> = {
  showModal(modalsState: any, modalToShow: ModalsState): void {
    modalsState.currentModal = modalToShow;
  },
  clearModal(modalsState: any): void {
    modalsState.currentModal = "";
  }
};

const modals: Module<ModalsState, RootState> = {
  namespaced,
  state,
  mutations
};

export default modals;
