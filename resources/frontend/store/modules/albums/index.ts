import { AxiosError, AxiosResponse } from "axios";
import { ActionTree, Module, MutationTree } from "vuex";
import { RootState } from "../../types";
import { Album, NewAlbum } from "./types";

const namespaced: boolean = true;

const state: Album = {
  data: [],
  currentAlbum: {
    title: "",
    desc: ""
  }
};

const mutations: MutationTree<Album> = {
  addAllUserAlbums(albumsState, userAlbums: NewAlbum[]) {
    albumsState.data = userAlbums;
  },

  addNewUserAlbum(albumsState, newAlbum: NewAlbum) {
    albumsState.data.push(newAlbum);
  },

  addCurrentAlbum(albumsState, currentAlbum: NewAlbum) {
    albumsState.currentAlbum = currentAlbum;
  }
};

const actions: ActionTree<Album, RootState> = {
  async createNewAlbum({ commit }, newAlbum: Album): Promise<any> {
    try {
      const response: AxiosResponse = await this.$axios.post("/albums", newAlbum);
      commit("addNewUserAlbum", response.data);
    } catch (error) {
      throw new Error(error);
    }
  },

  fetchAlbumById({ commit }, albumId: number) {
    this.$axios.get(`/albums/${albumId}`).then((response: AxiosResponse) => {
      commit("addCurrentAlbum", response.data);
    });
  },

  fetchUserAlbums({ commit }, store) {
    this.$axios.get("/albums").then((response: AxiosResponse) => {
      commit("addAllUserAlbums", response.data);
    });
  }
};

const albums: Module<Album, RootState> = {
  state,
  namespaced,
  actions,
  mutations
};

export default albums;
