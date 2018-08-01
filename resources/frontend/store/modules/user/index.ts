import { ActionTree, Module } from "vuex";
import { setupToken } from "../../../helpers/jwt";
import router from "../../../router";
import { RootState } from "../../types";
import { NewUser, User, UserState } from "./types";

const namespaced: boolean = true;

const actions: ActionTree<UserState, RootState> = {
  login({ commit }, existedUser: User): void {
    console.log("existedUser", existedUser);

    this.$axios
      .post("/login", existedUser)
      .then((response) => {
        if (response.status === 200) {
          const { token, ttl } = response.data;
          setupToken(token, ttl);

          // router.replace("/");
        }
      })
      .catch((e) => {
        commit(
          "alerts/showAlerts",
          {
            type: "warning",
            messages: [e.response.data.error]
          },
          { root: true }
        );
      });
  },
  register({ commit }, newUser: NewUser): void {
    console.log("new user data", newUser);

    return this.$axios
      .post("/register", newUser)
      .then((response) => {
        commit(
          "alerts/showAlerts",
          {
            type: "warning",
            messages: ["Регистрация прошла успешно"]
          },
          { root: true }
        );
      })
      .catch((e) => console.error(e));
  }
};

const user: Module<UserState, RootState> = {
  namespaced,
  actions
};

export default user;
