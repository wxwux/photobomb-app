export interface Album {
  data: NewAlbum[];
  currentAlbum: NewAlbum;
}

export interface NewAlbum {
  title: string;
  desc: string;
  cover?: any;
}
