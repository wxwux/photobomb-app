
import { Module, MutationTree, ActionTree, GetterTree } from "vuex";
import { RootState, PhotoItem, UploadedPhotos, Photo } from "../../types";
import { PhotosState } from "./types";
import { AxiosResponse } from "axios";

const namespaced: boolean = true;

const state: PhotosState = {
  photosToUpload: [],
  photosWithErrors: [],
  uploadedPhotos: {
    folder: "",
    photos: []
  },
};

const mutations: MutationTree<PhotosState> = {
  // setUploadedPhotos(photosState: PhotosState, data: UploadedPhotos): void {
  //   photosState.uploadedPhotos = data;
  // },
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
};

const getters: GetterTree<PhotosState, RootState> = {
  getOnlyOriginalFiles(photosState: PhotosState): File[] {
    return photosState.photosToUpload.map((uploadedPhoto: PhotoItem) => uploadedPhoto.original);
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


  async updatePhoto({ commit }, photo: Photo): Promise<any> {
    try {
      const response: AxiosResponse = await this.$axios.post(`/photos/${photo.id}`, photo);
      commit("replaceEditedPhoto", response.data);
    } catch (error) {
      console.log(error);
    }
  }
};

const photos: Module<PhotosState, RootState> = {
  namespaced,
  state,
  mutations,
  getters,
  actions
};

export default photos;
