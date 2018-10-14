<template lang="pug">
  .uploader
    label.uploader__elem(
    :class="{active: isActiveView, uploaded: anyPicsUploaded}"
      @dragover.prevent="isActiveView = true"
      @dragleave.prevent="isActionView = false"
      @drop.prevent="handleUpload"
    )
      input(
        type="file"
        multiple="true"
        ref="uploader"
        v-if="anyPicsUploaded === false"
      ).uploader__real
      .uploader__items
        uploader-item(
          v-for="pic in picsToRender"
          :pic="pic"
          :key="pic.id"
        )
      .uploader__desc(v-if="anyPicsUploaded === false") 
        span.uploader__desc-text Перетащите фото сюда или #[a.uploader__link выберите файл]

</template>

<script lang="ts">
import uuid from "uuid/v1";
import Vue from "vue";
import { Component, Prop } from "vue-property-decorator";
import { renderFile } from "../helpers/files";
import uploaderItem from "./uploaderItem.vue";

@Component({
  name: "Uploader",
  components: { uploaderItem }
})
export default class Uploader extends Vue {
  public isActiveView: boolean = false;

  public picsToRender: object[] = [];

  get anyPicsUploaded() {
    return this.picsToRender.length !== 0;
  }
  public handleUpload(e): void {
    e.preventDefault();
    this.isActiveView = false;
    this.renderUploadedFiles(e);
  }

  public renderUploadedFiles(e): void {
    const uploader = this.$refs.uploader as HTMLElement;
    const files = e.dataTransfer.files;

    for (const currentFile of files) {
      this.drawPictures(currentFile).then((reader) => {
        console.log(reader);

        const picData = {
          id: uuid(),
          url: reader.result
        };

        console.log(picData);

        this.picsToRender.push(picData);
      });
    }
  }

  public drawPictures(file): Promise<any> {
    const reader = new FileReader();

    reader.readAsDataURL(file);
    return new Promise((resolve, reject) => {
      reader.onloadend = () => {
        resolve(reader);
      };
      reader.onerror = (e) => {
        throw new Error("error");
      };
    });
    // reader.onloadend = () => {
    //   whereToRender.style.backgroundImage = `url(${reader.result})`;
    // };
  }
}
</script>

<style lang="pcss" scoped src="styles/uploader.pcss"></style>
