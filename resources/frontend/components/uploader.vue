<template lang="pug">
  .uploader
    label.uploader__elem(
    :class="{active: isActiveView, uploaded: anyPicsUploaded}"
      @dragover.prevent="isActiveView = true"
      @dragleave.prevent="isActiveView = false"
      @drop.prevent="handleUpload"
    )
      input(
        type="file"
        multiple="true"
        ref="uploader"
        v-if="anyPicsUploaded === false",
        @change="handleUpload"
      ).uploader__real
      .uploader__items
        uploader-item(
          v-for="pic in picsToRender"
          :pic="pic"
          :key="pic.id"
          @removeItem="removeItem"
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

const ObjectInstance = Object;

interface PicData {
  id: number;
  url: string;
}

@Component({
  name: "Uploader",
  components: { uploaderItem }
})
export default class Uploader extends Vue {
  public isActiveView: boolean = false;

  public picsToRender: object[] = [];

  get anyPicsUploaded(): boolean {
    return this.picsToRender.length !== 0;
  }

  public handleUpload(e): void {
    e.preventDefault();
    this.isActiveView = false;

    const filesObject = e.dataTransfer || e.target;

    const files = filesObject.files;

    this.renderUploadedFiles(files);
  }

  public renderUploadedFiles(files): void {
    // const uploader = this.$refs.uploader as HTMLElement;
    for (const currentFile of files) {
      this.drawPictures(currentFile).then((reader) => {
        const picData: PicData = {
          id: uuid(),
          url: reader.result
        };
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
  }

  public removeItem(idToRemove: number) {
    this.picsToRender = this.picsToRender.filter(
      (pic: any) => pic.id !== idToRemove
    );
  }
}
</script>

<style lang="pcss" scoped src="styles/uploader.pcss"></style>
