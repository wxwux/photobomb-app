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
        accept="image/jpeg,image/png,image/jpg"
        @change="handleUpload"
      ).uploader__real
      .uploader__items
        uploader-item(
          v-for="pic in uploadedPhotos"
          :pic="pic.rendered"
          :key="pic.rendered.id"
          @removeItem="removeUploadedPhoto"
        )
      .uploader__desc(v-if="anyPicsUploaded === false") 
        span.uploader__desc-text Перетащите сюда либо #[a.uploader__link выберите фотографии]

    .error-wrapper(v-if="picsLoadedWithErrors.length") 
      .error-wrapper__desc Размер файла превышает 1.5 MB
      .uploader__elem.uploader__elem--error
        .uploader__items
          uploader-item(
            v-for="pic in picsLoadedWithErrors"
            :pic="pic"
            :key="pic.id"
            hideRemoveBtn
          )

</template>

<script lang="ts">
import uuid from "uuid/v1";
import Vue from "vue";
import { Component, Prop } from "vue-property-decorator";
import { renderFile } from "../helpers/files";
import uploaderItem from "./uploaderItem.vue";
import { namespace } from "vuex-class";
import { BindingHelpers } from "vuex-class/lib/bindings";

interface PicData {
  id: number;
  url: string;
}

const photos: BindingHelpers = namespace("photos");

@Component({
  name: "Uploader",
  components: { uploaderItem }
})
export default class Uploader extends Vue {
  public isActiveView: boolean = false;

  public picsToRender: object[] = [];

  public picsLoadedWithErrors: object[] = [];

  @photos.Mutation("addUploadedPhoto")
  public addUploadedPhoto;

  @photos.Mutation("removeUploadedPhoto")
  public removeUploadedPhoto;

  @photos.State((state) => state.uploadedPhotos)
  public uploadedPhotos!: object[];

  get anyPicsUploaded(): boolean {
    return this.uploadedPhotos.length !== 0;
  }

  public handleUpload(e): void {
    e.preventDefault();
    this.isActiveView = false;
    this.picsLoadedWithErrors = [];

    const filesObject = e.dataTransfer || e.target;

    const files = filesObject.files;

    this.renderUploadedFiles(files);
  }

  public async renderUploadedFiles(files): Promise<any> {
    // const uploader = this.$refs.uploader as HTMLElement;

    for (const currentFile of files) {
      try {
        const reader = await this.drawPictures(currentFile);
        const overSized = currentFile.size > 1.5 * 1000 * 1000;
        const renderedInfo: PicData = {
          id: uuid(),
          url: reader.result
        };

        if (overSized) {
          this.picsLoadedWithErrors.push({
            id: uuid(),
            url: reader.result
          });
          continue;
        }

        this.addUploadedPhoto({
          original: currentFile,
          rendered: renderedInfo
        });

      } catch (error) {
        console.log(error);
      }
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
}
</script>

<style lang="pcss" scoped src="styles/uploader.pcss"></style>
