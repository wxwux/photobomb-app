<template lang="pug">
  #modal-album-cover
    modals-item(
      title="Добавить фотографии"
    )
      template(slot="modal-content")
        .album-cover__name 
          b.album-cover__label Название
          .album-cover__title {{currentAlbum.title}}
        .album-cover__uploads
          uploader
      template(slot="modal-buttons")
        .modal__buttons-common
          .modal__buttons-elem
            button-round(
              text="Сохранить"
              :filled="true"
            )
          .modal__buttons-elem
            button-round(
              text="Отменить"
              bgClass="transparent"
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

import { Album } from "../store/modules/albums/types";
const album: BindingHelpers = namespace("albums");

@Component({
  name: "ModalsUploadPhoto",
  components: { modalsItem, uploader, buttonRound }
})
export default class ModalsUploadPhotos extends Vue {
  @album.State((state: Album) => state.currentAlbum)
  public currentAlbum!: object;
}
</script>

<style lang="pcss" scoped src="styles/modals.pcss"></style>
<style lang="pcss" scoped src="styles/modalUploadPhotos.pcss"></style>

