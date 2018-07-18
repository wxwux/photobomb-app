import { ActionTree, Module } from "vuex";
import { RootState } from "../../types";
import { UserState } from "./types";

const namespaced: boolean = true;

const actions: ActionTree<UserState, RootState> = {
  login(): void {
    console.log("login action");

    // this.$http
    //   .post("/login", this.existedUser)
    //   .then((response) => {
    //     if (response.status === 200) {
    //       const {token, ttl} = response.data;
    //       setupToken(token, ttl);
    //     }
    //   })
    //   .catch((e) => console.log(e));
  }
};

const user: Module<UserState, RootState> = {
  namespaced,
  actions
};

export default user;
