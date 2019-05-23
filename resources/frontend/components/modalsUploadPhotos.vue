<template lang="pug">
  #modal-album-cover
    modals-item(
      title="Добавить фотографии"
      @onClose="closeModal"
    )
      template(slot="modal-content")
        .album-cover__name 
          b.album-cover__label Название
          .album-cover__title {{currentAlbum.title}}
        .album-cover__uploads
          uploader(
            :blocked="uploaderIsLocked"
          )
      template(slot="modal-buttons")
        .modal__buttons-common
          .modal__buttons-elem
            button-round(
              text="Сохранить"
              :filled="true"
              @click="uploadPhotos"
            )
          .modal__buttons-elem
            button-round(
              text="Отменить"
              bgClass="transparent"
              @click="closeModal"
            )
</template>

<script lang="ts">
import Vue from "vue";
import { Component } from "vue-property-decorator";
import modalsItem from "./modalsItem.vue";
import uploader from "./uploader.vue";
import buttonRound from "./buttonRound.vue";
import { BindingHelpers } from "vuex-class/lib/bindings";
import { namespace, State } from "vuex-class";

import { AlbumState } from "../store/modules/albums/types";

const album: BindingHelpers = namespace("albums");
const modals: BindingHelpers = namespace("modals");
const photos: BindingHelpers = namespace("photos");

@Component({
  name: "ModalsUploadPhoto",
  components: { modalsItem, uploader, buttonRound }
})
export default class ModalsUploadPhotos extends Vue {
  public uploaderIsLocked: boolean = false;

  @album.State((state: AlbumState) => state.currentAlbum)
  public currentAlbum!: object;

  @modals.Mutation("clearModal")
  public clearModal;

  @photos.Action("uploadPhotosToAlbum")
  public uploadPhotosToAlbum;

  @photos.Mutation("clearBrokenPhoto")
  public clearBrokenPhoto;

  @photos.Mutation("clearUploadedPhotos")
  public clearUploadedPhotos;

  public closeModal() {
    this.clearModal();
    this.clearBrokenPhoto();
    this.clearUploadedPhotos();
  }

  public async uploadPhotos() {
    this.clearBrokenPhoto();
    this.uploaderIsLocked = true;

    try {
      await this.uploadPhotosToAlbum();
      this.clearUploadedPhotos();
      this.clearModal();
    } catch (error) {
      console.error();
    } finally {
      this.uploaderIsLocked = false;
    }
  }
}
</script>

<style lang="pcss" scoped src="styles/modals.pcss"></style>
<style lang="pcss" scoped src="styles/modalUploadPhotos.pcss"></style>

