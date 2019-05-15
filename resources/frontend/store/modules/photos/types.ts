export interface PhotosState {
  uploadedPhotos: PhotoItem[];
}

export interface PhotoItem {
  original: File;
  rendered: RenderedPhoto;
}

export interface RenderedPhoto {
  id: string;
  url: string;
}


