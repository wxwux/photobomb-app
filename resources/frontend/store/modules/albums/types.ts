import { Photo } from "../../types";
export interface AlbumState {
  data: AlbumItem[];
  currentAlbum: AlbumItem;
  photos: {
    folder: string,
    photos: Photo[]
  };
  photoToEdit: Photo;
}

export interface AlbumItem {
  id: number;
  title: string;
  desc: string;
  cover?: any;
}
