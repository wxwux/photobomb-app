export interface PhotosState {
  photosToUpload: PhotoItem[];
  photosWithErrors: PhotoItem[];
  uploadedPhotos: UploadedPhotos;
  photoToEdit: Photo;
  recentPhotos: Photo[];
  photoInfo: Photo;
}

export interface UploadedPhotos {
  folder: string;
  photos: Photo[];
}

export interface Photo {
  id?: number;
  albums_id?: number;
  description: string;
  filename?: string;
  title: string;
  likes?: number;
  comments?: object[];
  likedByYou?: boolean;
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
