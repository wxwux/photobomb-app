import { ActionTree, Module, MutationTree } from "vuex";
import { RootState } from "../../types";
import { NewUser, User, UserState, UserDetails, Socials } from "./types";
import { AxiosResponse, AxiosError } from "axios";
import { generateStdError } from "../../../helpers/errorHandler";

const namespaced: boolean = true;

const state: UserState = {
  userDetails: {
    name: "",
    description: "",
    socials: {
      email: ""
    }
  }
};

const mutations: MutationTree<UserState> = {
  setUserDetails(usersState: UserState, userDetails: UserDetails) {
    usersState.userDetails = userDetails;
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
      generateStdError(error);
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

  async updateProfile({ commit }, profileData: UserDetails): Promise<any> {
    try {
      const response: AxiosResponse = await this.$axios.post("/updateUser", profileData);
      const updatedUser: UserDetails = response.data as UserDetails;
      const { vk, fb, tw, email } = response.data;

      const socials: Socials = {
        vk, fb, tw, email
      };

      updatedUser.socials = socials;

      commit("setUserDetails", updatedUser);

    } catch (error) {
      generateStdError(error);
    }
  },

  async getUserInfo({ commit }): Promise<any> {
    try {
      const response: AxiosResponse = await this.$axios.get("/userInfo");
      const userInfo: UserDetails = response.data as UserDetails;

      commit("setUserDetails", userInfo);
    } catch (error) {
      generateStdError(error);
    }
  }
};

const user: Module<UserState, RootState> = {
  namespaced,
  state,
  actions,
  mutations,
};

export default user;
