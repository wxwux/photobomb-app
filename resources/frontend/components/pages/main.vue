<template lang="pug">
  div
    .root__header
      app-header
        template(slot="header-bottom")
          .search-container
            search
    main.root__content
      section.x-section.section--white
        .x-container
          h1.x-section-title Новое в мире 
          .section__content
            card-list
              div(slot-scope="{item}") {{item}}
                card-photo
          .section__load-btn
            .section__load-btn-container
              round-button 
      section.x-section.x-section--gray
        .x-container
          .albums-title
            h2.x-section-title Мои альбомы
            .albums-title__button
              slide-button(
                text="Добавить"
                icon="add"
                @click.native="showModal('albums')"
              )
          card-list(
            :itemsInRow="4"
            :items="userAlbums"
          )
            div(slot-scope="{item}")
              card-album(
                :title="item.title"
                :cover="item.cover"
                :href="`/album/${item.id}`"
              )
    .root__footer
      app-footer
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import { Mutation, namespace, State } from "vuex-class";
import { NewAlbum } from "../../store/modules/albums/types";
import roundButton from "../buttonRound.vue";
import slideButton from "../buttonSlide.vue";
import cardAlbum from "../cardAlbum.vue";
import cardList from "../cardList.vue";
import cardPhoto from "../cardPhoto.vue";
import footer from "../footer.vue";
import header from "../header.vue";
import search from "../search.vue";


const modals = namespace("modals");
const albums = namespace("albums");

@Component({
  components: {
    appFooter: footer,
    appHeader: header,
    cardAlbum, cardList, cardPhoto, roundButton, slideButton, search
  },
  name: "MainPage"
})
export default class MainPage extends Vue {
  @modals.Mutation("showModal")
  public showModal!: void;

  @albums.Action("fetchUserAlbums")
  public fetchUserAlbums!: any;

  @albums.State((state) => state.data)
  public userAlbums!: NewAlbum[];

  public created() {
    this.fetchUserAlbums();
  }
}
</script>

<style lang="pcss" scoped>
  .search-container {
    display: flex;
    justify-content: flex-end;
  }

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
