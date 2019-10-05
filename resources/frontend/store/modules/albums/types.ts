import { Photo } from "../../types";
export interface AlbumState {
  data: AlbumItem[];
  currentAlbum: CurrentAlbum;
  photos: Photo[];
}

export interface AlbumItem {
  title: string;
  desc: string;
  cover?: any;
}


export interface CurrentAlbum {
  id: number;
  title: string;
  desc: string;
  cover: any;
}
