export interface RootState {
  $axios: any;
}

export interface UploadedPhotos {
  folder: string;
  photos: Photo[];
}

export interface Pagination {
  first?: string;
  last?: string;
  next: string;
  prev?: string;
}

export interface Photo {
  id?: number;
  albums_id?: number;
  description: string;
  filename?: string;
  title: string;
  total_likes?: number;
  comments?: object[];
  liked_by_user?: boolean;
}

export interface PhotoItem {
  original: File;
  rendered: RenderedPhoto;
}

export interface RenderedPhoto {
  id: string;
  url: string;
}

export interface LikesPayload {
  likes: number;
  photoId: number;
  likedByYou: boolean;
}

export interface Comment {
  id?: number;
  photo_id: number;
  content: string;
}
