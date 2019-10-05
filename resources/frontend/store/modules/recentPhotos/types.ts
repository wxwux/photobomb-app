import { Photo } from "../photos/types";
export interface RecentPhotosState {
  recentPhotos: {
    data: Photo[],
    links: Pagination
  };
  photoInfo: Photo;
}

export interface Pagination {
  first?: string;
  last?: string;
  next: string;
  prev?: string;
}
