<template lang="pug">
  #modal-album-cover
    modals-item(
      title="Добавить фотографии"
    )
      template(slot="modal-content")
        .album-cover__name 
          b.album-cover__label Название
          .album-cover__title Как я провел лето
        .album-cover__uploads
          uploader
</template>

<script lang="ts">
import Vue from "vue";
import { Component } from "vue-property-decorator";
import modalsItem from "./modalsItem.vue";
import uploader from "./uploader.vue";
@Component({
  name: "ModalsUploadPhoto",
  components: { modalsItem, uploader }
})
export default class ModalsUploadPhotos extends Vue {}
</script>

<style lang="pcss" scoped src="styles/modalUploadPhotos.pcss"></style>

