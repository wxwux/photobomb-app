import { ActionTree, Module } from "vuex";
import { RootState } from "../../types";
import { NewUser, User, UserState, UserDetails } from "./types";
import { AxiosResponse, AxiosError } from "axios";
import requests from "../../../requests";

const namespaced: boolean = true;

const state: UserState  = {
  user: null,
  userDetails: {
    name: "",
    description: "",
    socials: {
      email: ""
    }
  }
};

const actions: ActionTree<UserState, RootState> = {
  async login({ commit }, existedUser: User): Promise<any> {
    try {
      const response: AxiosResponse = await this.$axios.post(
        "/login",
        existedUser
      );

      return response;
    } catch (error) {
      throw new Error(error.response.data.error);
    }
  },
  async register({ commit }, newUser: NewUser): Promise<any> {
    try {
      const response: AxiosResponse = await this.$axios.post(
        "/register",
        newUser
      );

      return response;
    } catch (error) {
      throw new Error(error);
    }
  },

  async updateProfile({commit}, profileData: UserDetails): Promise<any> {
    try {
      const response: AxiosResponse = this.$axios.post("/updateUser", profileData);

      console.log(response);
    } catch (error) {
      console.log(error);
    }
  }
};

const user: Module<UserState, RootState> = {
  namespaced,
  state,
  actions
};

export default user;
