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
  createNewAlbum({ commit }, newAlbum: Album) {
    return this.$axios.post("/albums", newAlbum).then(
      (response: AxiosResponse) => {
        console.log("albums response", response);
        const createdAlbum = response.data;
        commit("addNewUserAlbum", response.data);
        commit(
          "alerts/showAlerts",
          {
            type: "success",
            messages: ["Альбом добавлен"]
          },
          { root: true }
        );
      },
      (error: AxiosError) => {
        console.error(error);
        commit(
          "alerts/showAlerts",
          {
            type: "error",
            messages: ["Ошибка. Не удалось добавить альбом"]
          },
          { root: true }
        );
      }
    );
  },

  fetchAlbumById({commit}, albumId: number) {
    this.$axios(`/albums/${albumId}`).then((response: AxiosResponse) => {
      commit("addCurrentAlbum", response.data);
    });
  },

  fetchUserAlbums({ commit }, store) {
    console.log("fetcho");
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
