
import { Module, MutationTree, ActionTree, GetterTree } from "vuex";
import { RootState, PhotoItem, UploadedPhotos, Photo } from "../../types";
import { PhotosState } from "./types";
import { AxiosResponse } from "axios";
import { generateStdError } from "../../../helpers/errorHandler";

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
  async uploadPhotosToAlbum({ getters: photoGetters, rootGetters, commit }): Promise<any> {
    const formData: FormData = new FormData();
    const photosToUpload = photoGetters.getOnlyOriginalFiles;

    formData.append("albumId", rootGetters["albums/getCurrentAlbumId"]);

    photosToUpload.forEach((photo: File, i: number) => {
      formData.append(`photos[]`, photo);
    });

    try {
      const response: AxiosResponse = await this.$axios.post("/photos", formData);

      commit("albums/setAlbumsPhotos", response.data, { root: true });
    } catch (error) {
      generateStdError(error);
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
