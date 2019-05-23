export interface AlbumState {
  data: AlbumItem[];
  currentAlbum: CurrentAlbum;
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
