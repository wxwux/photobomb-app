<template lang="pug">
  a(href="").album-card
    .album-card__photo(
      :style="`background-image: url(${fullCoverUrl})`"
    )
    .album-card__data {{title}}

</template>

<script lang="ts">
import Vue from "vue";
import { Component, Prop } from "vue-property-decorator";

@Component({
  name: "CardAlbum"
})
export default class CardAlbum extends Vue {

  @Prop({default: "Новый альбом"})
  public title!: string;

  @Prop()
  public cover!: string;

  get fullCoverUrl() {
    return `/uploads/albums_covers/${this.cover}`;
  }
}
</script>

<style lang="pcss" src="styles/cardAlbum.pcss" scoped></style>

