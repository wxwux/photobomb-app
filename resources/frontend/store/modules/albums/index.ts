import { AxiosError, AxiosResponse } from "axios";
import { ActionTree, Module, MutationTree, GetterTree } from "vuex";
import { RootState, Photo } from "../../types";
import { AlbumState, AlbumItem, CurrentAlbum } from "./types";

const namespaced: boolean = true;

const state: AlbumState = {
  data: [],
  currentAlbum: {
    id: 0,
    title: "",
    desc: "",
    cover: ""
  },
  photos: {
    folder: "",
    photos: []
  },
  photoToEdit: {
    title: "",
    description: ""
  }
};

const getters: GetterTree<AlbumState, RootState> = {
  getCurrentAlbumId(albumsState: AlbumState): number {
    return albumsState.currentAlbum.id;
  }
};

const mutations: MutationTree<AlbumState> = {
  addAllUserAlbums(albumsState: AlbumState, userAlbums: AlbumItem[]) {
    albumsState.data = userAlbums;
  },

  addNewUserAlbum(albumsState: AlbumState, newAlbum: AlbumItem) {
    albumsState.data.push(newAlbum);
  },

  addCurrentAlbum(albumsState: AlbumState, currentAlbum: CurrentAlbum) {
    albumsState.currentAlbum = currentAlbum;
  },
  setAlbumsPhotos(albumsState: AlbumState, data) {
    albumsState.photos = data;
  },
  setPhotoToEdit(photosState: AlbumState, editedPhotoId: number) {
    const getPhotoById = (photo: Photo): boolean => photo.id === editedPhotoId;

    photosState.photoToEdit = photosState.photos.photos.filter(getPhotoById)[0];
  },

  replaceEditedPhoto(photosState: AlbumState, editedPhoto: Photo) {
    const uploadedPhotos: Photo[] = photosState.photos.photos;
    const replaceExistedPhotoWithEdited = (photo: Photo): Photo => (photo.id === editedPhoto.id ? editedPhoto : photo);

    photosState.photos.photos = uploadedPhotos.map(replaceExistedPhotoWithEdited);
  },
};

const actions: ActionTree<AlbumState, RootState> = {
  async fetchPhotos({ commit }, albumId: number): Promise<any> {
    try {
      const response: AxiosResponse = await this.$axios.get(`/photos/${albumId}`);
      commit("setAlbumsPhotos", response.data);
    } catch (error) {
      console.error(error);
    }
  },

  async updatePhoto({ commit }, photo: Photo): Promise<any> {
    try {
      const response: AxiosResponse = await this.$axios.post(`/photos/${photo.id}`, photo);
      commit("replaceEditedPhoto", response.data);
    } catch (error) {
      console.log(error);
    }
  },

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
