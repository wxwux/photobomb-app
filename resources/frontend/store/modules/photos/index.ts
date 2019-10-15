import { Module, MutationTree, ActionTree, GetterTree } from "vuex";
import { RootState, Photo, LikesPayload, Comment, Pagination } from "../../types";
import { PhotosState } from "./types";
import { AxiosResponse } from "axios";
import { generateStdError } from "../../../helpers/errorHandler";

const namespaced: boolean = true;

const state: PhotosState = {
  recentPhotos: {
    data: [],
    links: {
      next: ""
    }
  },
  photoToEdit: {
    id: 0,
    title: "",
    description: ""
  },
  photoInfo: {
    id: 0,
    title: "",
    description: "",
    total_likes: 0,
    comments: [],
    filename: ""
  }
};

const mutations: MutationTree<PhotosState> = {
  updateLikes(photosState: PhotosState, payload: LikesPayload) {
    const updateLikes = (photo: Photo): Photo => {
      if (photo.id === payload.photoId) {
        photo.total_likes = payload.likes;
        photo.liked_by_user = payload.likedByYou;
      }

      return photo;
    };

    photosState.recentPhotos.data = photosState.recentPhotos.data.map(updateLikes);
  },
  addNewComment(photosState: PhotosState, payload: Comment) {
    const addComments = (photo: Photo): Photo => {
      if (payload.photo_id === photo.id) {
        const comments = photo.comments as Comment[];
        comments.push(payload);
      }
      return photo;
    };

    photosState.recentPhotos.data = photosState.recentPhotos.data.map(addComments);
  },
  setDetailedPhoto(photosState: PhotosState, choosedPhotoId: number) {
    photosState.photoInfo = photosState.recentPhotos.data.filter((photo: Photo) => {
      return photo.id === choosedPhotoId;
    })[0];
  },

  setRecentPhotos(photosState: PhotosState, recentPhotos: Photo[]) {
    photosState.recentPhotos.data = recentPhotos;
  },

  addRecentPhotos(photosState: PhotosState, recentPhotos: Photo[]) {
    photosState.recentPhotos.data = photosState.recentPhotos.data.concat(recentPhotos);
  },

  addRecentPagination(photosState: PhotosState, pagination: Pagination) {
    photosState.recentPhotos.links = pagination;
  }
};

const actions: ActionTree<PhotosState, RootState> = {

  async fetchPhotos({ commit }, albumId: number): Promise<any> {
    try {
      const response: AxiosResponse = await this.$axios.get(`/photos/${albumId}`);
      commit("setUploadedPhotos", response.data);
    } catch (error) {
      generateStdError(error);
    }
  },

  async getRecentPhotos({ commit }): Promise<any> {
    try {
      const response: AxiosResponse = await this.$axios.get("/photos/recent");
      commit("setRecentPhotos", response.data.data);
      commit("addRecentPagination", response.data.links);
    } catch (error) {
      generateStdError(error);
    }
  },

  async getMoreRecentPhotos({ commit }, link: string): Promise<any> {
    try {
      const response: AxiosResponse = await this.$axios.get(link);
      commit("addRecentPhotos", response.data.data);
      commit("addRecentPagination", response.data.links);
    } catch (error) {
      generateStdError(error);
    }
  },

  async getInfoById({ commit }, photoId: number): Promise<any> {
    const response: AxiosResponse = await this.$axios.get(`/photo/${photoId}`);
  },

  async likeIt({ commit }, photoId: number): Promise<any> {
    try {

      const response: AxiosResponse = await this.$axios.post("/like", {
        id: photoId
      });

      const payload: LikesPayload = {
        photoId,
        likes: response.data.likes,
        likedByYou: true
      };

      commit("updateLikes", payload);

    } catch (error) {
      generateStdError(error);
    }
  },

  async dislikeIt({ commit }, photoId: number): Promise<any> {
    try {
      const response: AxiosResponse = await this.$axios.post("/dislike", {
        id: photoId
      });

      const payload: LikesPayload = {
        photoId,
        likes: response.data.likes,
        likedByYou: false
      };

      commit("updateLikes", payload);

    } catch (error) {
      generateStdError(error);
    }
  },

  async addComment({ commit }, comment: Comment) {
    try {
      const response: AxiosResponse = await this.$axios.post("/comments", {
        photo_id: comment.photo_id,
        content: comment.content
      });

      commit("addNewComment", response.data);
    } catch (error) {
      generateStdError(error);
    }
  },

};

const photos: Module<PhotosState, RootState> = {
  namespaced,
  state,
  mutations,
  actions
};

export default photos;
