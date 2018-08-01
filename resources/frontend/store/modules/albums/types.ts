export interface Album {
  data: NewAlbum[];
}

export interface NewAlbum {
  title: string;
  desc: string;
  cover?: any;
}
