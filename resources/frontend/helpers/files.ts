export function renderFile(fileToRender: File, whereToRender: HTMLElement) {
  const reader = new FileReader();

  reader.onloadend = () => {
    whereToRender.style.backgroundImage = `url(${reader.result})`;
  };

  reader.readAsDataURL(fileToRender);
}
