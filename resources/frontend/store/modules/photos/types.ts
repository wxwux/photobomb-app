import { Photo, Pagination } from "../../types";
export interface PhotosState {
  photoToEdit: Photo;
  recentPhotos: {
    data: Photo[],
    links: Pagination
  };
  photoInfo: Photo;
}
