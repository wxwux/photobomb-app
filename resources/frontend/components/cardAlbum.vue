<template lang="pug">
  .album-card
    router-link(
      tag="div"
      :to="href"
    ).album-cart__display
      .album-card__photo(
        :style="`background-image: url(${fullCoverUrl})`"
      )
    .album-card__data 
      card-edit-line(:title="title")
      

</template>

<script lang="ts">
import Vue from "vue";
import { Component, Prop } from "vue-property-decorator";
import CardEditLine from "./card-edit-line.vue";

@Component({
  name: "CardAlbum",
  components: { CardEditLine }
})
export default class CardAlbum extends Vue {
  @Prop({ default: "Новый альбом" })
  public title!: string;

  @Prop() public cover!: string;

  @Prop({ default: "/" })
  public href!: string;

  get fullCoverUrl() {
    return `/uploads/albums_covers/${this.cover}`;
  }
}
</script>

<style lang="pcss" src="styles/cardAlbum.pcss" scoped></style>

