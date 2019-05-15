import { Module, MutationTree, ActionTree, GetterTree } from "vuex";
import { RootState } from "../../types";
import { PhotosState, PhotoItem } from "./types";

const namespaced: boolean = true;

const state: PhotosState = {
  uploadedPhotos: []
};

const mutations: MutationTree<PhotosState> = {
  addUploadedPhoto(photosState: PhotosState, photo: PhotoItem): void {
    photosState.uploadedPhotos.push(photo);
  },
  removeUploadedPhoto(photosState: PhotosState, removedPhotoId: string): void {
    photosState.uploadedPhotos = photosState.uploadedPhotos.filter(
      (pic: any) => pic.rendered.id !== removedPhotoId
    );
  }
};

const getters: GetterTree<PhotosState, RootState> = {
  getOnlyOriginalFiles(photosState: PhotosState): File[] {
    return photosState.uploadedPhotos.map((uploadedPhoto: PhotoItem) => uploadedPhoto.original);
  }
};


const actions: ActionTree<PhotosState, RootState> = {
  async uploadPhotosToAlbum({ getters }): Promise<any> {
    console.log(getters.getOnlyOriginalFiles);
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
