import { Module, MutationTree } from "vuex";
import { RootState } from "../../types";
import { AlertMessage, AlertsState } from "./types";

const namespaced: boolean = true;

const state: AlertsState = {
  data: {
    type: "",
    messages: []
  }
};

const mutations: MutationTree<AlertsState> = {
  showAlerts(alertsState, messages: AlertMessage) {
    alertsState.data = messages;
  }
};

const alerts: Module<AlertsState, RootState> = {
  namespaced,
  state,
  mutations
};

export default alerts;

