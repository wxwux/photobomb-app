import { PhotoItem, UploadedPhotos } from "../../types";
export interface PhotosState {
  photosToUpload: PhotoItem[];
  photosWithErrors: PhotoItem[];
  uploadedPhotos: UploadedPhotos;
}
