<template lang="pug">
  .album-card
    router-link(
      tag="div"
      :to="`/album/${item.id}`"
    ).album-cart__display
      .album-card__photo(
        :style="`background-image: url(${fullCoverUrl})`"
      )
    .album-card__data 
      card-edit-line(
        :title="item.title"
        @onEdit="$emit('onEdit', item)"
      )
      

</template>

<script lang="ts">
import Vue from "vue";
import { Component, Prop } from "vue-property-decorator";
import CardEditLine from "./card-edit-line.vue";
import { Mutation, namespace, State, Getter } from "vuex-class";
import { BindingHelpers } from "vuex-class/lib/bindings";
const modals: BindingHelpers = namespace("modals");
const albums: BindingHelpers = namespace("albums");

interface Card {
  id: string;
  cover: string;
  href: string;
}

@Component({
  name: "CardAlbum",
  components: { CardEditLine }
})

export default class CardAlbum extends Vue {
  @Prop({ default: {} })
  public item!: Card;

  @modals.Mutation("showModal")
  public showModal;

  get fullCoverUrl() {
    return `/uploads/albums_covers/${this.item.cover}`;
  }
}
</script>

<style lang="pcss" src="styles/cardAlbum.pcss" scoped></style>

