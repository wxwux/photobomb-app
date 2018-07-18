import { ActionTree, Module } from "vuex";
import { RootState } from "../../types";
import { AlertsState } from "./types";

const namespaced: boolean = true;

const state: AlertsState = {
  messages: null,
};

const actions: ActionTree<AlertsState, RootState> = {
  showAlerts() {
    console.log("hello");
  }
};

const alerts: Module<AlertsState, RootState> = {
  namespaced,
  state,
  actions
};

export default alerts;

