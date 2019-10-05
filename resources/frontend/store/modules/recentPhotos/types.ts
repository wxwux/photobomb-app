import { Photo, Pagination } from "../../types";
export interface RecentPhotosState {
  recentPhotos: {
    data: Photo[],
    links: Pagination
  };
  photoInfo: Photo;
}