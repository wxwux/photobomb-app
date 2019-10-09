import { Module, MutationTree } from "vuex";
import { RootState } from "../../types";
import { ModalsState } from "./types";

const namespaced: boolean = true;

const state: ModalsState = {
  currentModal: "",
  options: {}
};

const mutations: MutationTree<ModalsState> = {
  showModal(modalsState: any, modalToShow: ModalsState | any): void {
    if (typeof modalToShow === "string") {
      modalsState.currentModal = modalToShow;
    } else {
      modalsState.currentModal = modalToShow.name;
      modalsState.options = modalToShow;
    }
  },
  clearModal(modalsState: any): void {
    modalsState.currentModal = "";
    modalsState.options = {};
  }
};

const modals: Module<ModalsState, RootState> = {
  namespaced,
  state,
  mutations
};

export default modals;
