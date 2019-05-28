export interface PhotosState {
  photosToUpload: PhotoItem[];
  photosWithErrors: PhotoItem[];
  uploadedPhotos: UploadedPhotos;
  photoToEdit: Photo;
  recentPhotos: Photo[];
  photoInfo: PhotoInfo[];
}

export interface PhotoInfo {
  id: number;
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
}

export interface PhotoItem {
  original: File;
  rendered: RenderedPhoto;
}

export interface RenderedPhoto {
  id: string;
  url: string;
}
