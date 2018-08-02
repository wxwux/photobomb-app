<template lang="pug">
  div
    .root__header
      app-header(
        view="album-view"
        :headerData="currentAlbum"
      )
    main.root__content
      section.x-section.x-section--gray
        .x-container

    .root__footer
      app-footer(
        :footerData="currentAlbum"
      )
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import { Mutation, namespace, State } from "vuex-class";
import { NewAlbum } from "../../store/modules/albums/types";
import footer from "../footer.vue";
import header from "../header.vue";

const modals = namespace("modals");
const albums = namespace("albums");

@Component({
  components: {
    appFooter: footer,
    appHeader: header,
  },
  name: "MainPage"
})
export default class MainPage extends Vue {
  @modals.Mutation("showModal")
  public showModal!: void;

  @albums.Action("fetchAlbumById")
  public fetchAlbumById!: any;

  @albums.State((state) => state.currentAlbum)
  public currentAlbum!: NewAlbum;

  // @albums.State((state) => state.data)
  // public userAlbums!: NewAlbum[];

  public created() {
    this.fetchAlbumById(this.$route.params.id);
  }
}
</script>

<style lang="pcss" scoped>
  .section__load-btn {
    display: flex;
    justify-content: center;
  }

  .section__load-btn-container {
    width: 200px;
  }

  .albums-title {
    position: relative;
  }

  .albums-title__button {
    position: absolute;
    right: 0;
    top: 50%;
    transform: translateY(-50%);
  }
</style>
