export function renderFile(fileToRender: File, whereToRender: HTMLElement) {
  const reader = new FileReader();

  reader.onloadend = () => {
    whereToRender.style.backgroundImage = `url(${reader.result})`;
  };

  reader.readAsDataURL(fileToRender);
}

interface FileOptions {
  getOriginal: boolean;
}

export function getPhotoPath(fileName: string, folder: string, options?: FileOptions): string {
  const originalFolder = "origin";
  const uploadsFolder = "uploads";

  return options && options.getOriginal
    ? `/${uploadsFolder}/${folder}/${originalFolder}/${fileName}`
    : `/${uploadsFolder}/${folder}/${fileName}`;
}
