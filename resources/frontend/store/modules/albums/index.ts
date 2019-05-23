import { AxiosError, AxiosResponse } from "axios";
import { ActionTree, Module, MutationTree, GetterTree } from "vuex";
import { RootState } from "../../types";
import { AlbumState, AlbumItem, CurrentAlbum } from "./types";

const namespaced: boolean = true;

const state: AlbumState = {
  data: [],
  currentAlbum: {
    id: 0,
    title: "",
    desc: "",
    cover: ""
  }
};

const getters: GetterTree<AlbumState, RootState> = {
  getCurrentAlbumId(albumsState: AlbumState): number {
    return albumsState.currentAlbum.id;
  }
};

const mutations: MutationTree<AlbumState> = {
  addAllUserAlbums(albumsState, userAlbums: AlbumItem[]) {
    albumsState.data = userAlbums;
  },

  addNewUserAlbum(albumsState, newAlbum: AlbumItem) {
    albumsState.data.push(newAlbum);
  },

  addCurrentAlbum(albumsState, currentAlbum: CurrentAlbum) {
    albumsState.currentAlbum = currentAlbum;
  }
};

const actions: ActionTree<AlbumState, RootState> = {
  async createNewAlbum({ commit }, newAlbum: AlbumItem): Promise<any> {
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

const albums: Module<AlbumState, RootState> = {
  state,
  namespaced,
  actions,
  mutations,
  getters
};

export default albums;
