import { Module, MutationTree, ActionTree, GetterTree } from "vuex";
import { RootState } from "../../types";
import { PhotosState, PhotoItem, UploadedPhotos, Photo, LikesPayload, Comment, Pagination } from "./types";
import { AxiosResponse } from "axios";

const namespaced: boolean = true;

const state: PhotosState = {
  photosToUpload: [],
  photosWithErrors: [],
  recentPhotos: [],
  recentPhotosPagination: {
    first: "",
    last: "",
    next: "",
    prev: ""
  },
  photoToEdit: {
    id: 0,
    title: "",
    description: ""
  },
  uploadedPhotos: {
    folder: "",
    photos: []
  },
  photoInfo: {
    id: 0,
    title: "",
    description: "",
    likes: 0,
    comments: [],
    filename: ""
  }
};

const mutations: MutationTree<PhotosState> = {
  updateLikes(photosState: PhotosState, payload: LikesPayload) {
    photosState.recentPhotos = photosState.recentPhotos.map((photo: Photo) => {
      if (photo.id === payload.photoId) {
        photo.likes = payload.likes;
        photo.likedByYou = payload.likedByYou;
      }

      return photo;
    });
  },
  addNewComment(photosState: PhotosState, payload: Comment) {
    const addComments = (photo: Photo): Photo => {
      if (payload.photo_id === photo.id) {
        const comments = photo.comments as Comment[];
        comments.push(payload);
      }
      return photo;
    };

    photosState.recentPhotos = photosState.recentPhotos.map(addComments);

    // const currentComments = photosState.photoInfo.comments as Comment[];
    // currentComments.push(payload);
  },
  setDetailedPhoto(photosState: PhotosState, choosedPhotoId: number) {
    photosState.photoInfo = photosState.recentPhotos.filter((photo: Photo) => {
      return photo.id === choosedPhotoId;
    })[0];
  },

  addRecentPhotos(photosState: PhotosState, recentPhotos: Photo[]) {
    photosState.recentPhotos = photosState.recentPhotos.concat(recentPhotos);
  },

  setUploadedPhotos(photosState: PhotosState, data: UploadedPhotos): void {
    photosState.uploadedPhotos = data;
  },
  setPhotoToEdit(photosState: PhotosState, editedPhotoId: number) {
    const getPhotoById = (photo: Photo): boolean => photo.id === editedPhotoId;

    photosState.photoToEdit = photosState.uploadedPhotos.photos.filter(getPhotoById)[0];
  },

  replaceEditedPhoto(photosState: PhotosState, editedPhoto: Photo) {
    const uploadedPhotos = photosState.uploadedPhotos.photos;
    const replaceExistedPhotoWithEdited = (photo: Photo): Photo => (photo.id === editedPhoto.id ? editedPhoto : photo);

    photosState.uploadedPhotos.photos = uploadedPhotos.map(replaceExistedPhotoWithEdited);
  },

  addUploadedPhoto(photosState: PhotosState, photo: PhotoItem): void {
    photosState.photosToUpload.push(photo);
  },
  addBrokenPhoto(photosState: PhotosState, brokenPhoto: PhotoItem): void {
    photosState.photosWithErrors.push(brokenPhoto);
  },
  clearBrokenPhoto(photosState: PhotosState): void {
    photosState.photosWithErrors = [];
  },
  clearUploadedPhotos(photosState: PhotosState): void {
    photosState.photosToUpload = [];
  },
  removeUploadedPhoto(photosState: PhotosState, removedPhotoId: string): void {
    photosState.photosToUpload = photosState.photosToUpload.filter(
      (pic: any) => pic.rendered.id !== removedPhotoId
    );
  },
  setRecentPhotosPagination(photosState: PhotosState, data: Pagination): void {
    photosState.recentPhotosPagination = data;
  }
};

const getters: GetterTree<PhotosState, RootState> = {
  getOnlyOriginalFiles(photosState: PhotosState): File[] {
    return photosState.photosToUpload.map((uploadedPhoto: PhotoItem) => uploadedPhoto.original);
  },
  getNextUrl(photosState: PhotosState): string | null {
    const nextLink: string = photosState.recentPhotosPagination.next;
    if (nextLink.length) {
      return "/" + nextLink.split("/").filter((item, ndx) => ndx > 2).join("/");
    } else {
      return null;
    }
  }
};

const actions: ActionTree<PhotosState, RootState> = {
  async uploadPhotosToAlbum({ getters: photoGetters, rootGetters }): Promise<any> {
    const formData: FormData = new FormData();
    const photosToUpload = photoGetters.getOnlyOriginalFiles;

    formData.append("albumId", rootGetters["albums/getCurrentAlbumId"]);

    photosToUpload.forEach((photo: File, i: number) => {
      formData.append(`photos[]`, photo);
    });

    try {
      const response: AxiosResponse = await this.$axios.post("/photos", formData);

      console.log("response", response);

    } catch (error) {
      console.log(error);
    }
  },

  async fetchPhotos({ commit }, albumId: number): Promise<any> {
    try {
      const response: AxiosResponse = await this.$axios.get(`/photos/${albumId}`);
      commit("setUploadedPhotos", response.data);
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

  async getRecentPhotos({ commit }): Promise<any> {
    try {
      const response: AxiosResponse = await this.$axios.get("/photos/recent");
      commit("addRecentPhotos", response.data.data);
      commit("setRecentPhotosPagination", response.data.links);
    } catch (error) {
      console.error(error);
    }
  },

  // async getMoreRecentPhotos({commit}): Promise<any> {
  // },

  async getInfoById({ commit }, photoId: number): Promise<any> {
    const response: AxiosResponse = await this.$axios.get(`/photo/${photoId}`);
  },

  async likeIt({ commit }, photoId): Promise<any> {
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
      console.log(error);
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
      console.log(error);
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
      console.log(error);
    }
  },

};

const photos: Module<PhotosState, RootState> = {
  namespaced,
  state,
  mutations,
  getters,
  actions
};

export default photos;
