<template lang="pug">
  div
    .root__header
      app-header(
        view="album-view"
        :headerData="currentAlbum"
      )
        template(slot="header-bottom")
          likes-display
    main.root__content
      section.x-section.x-section--gray
        .x-container
          .x-section-side-buttons
            slide-button(
              text="Добавить"
              icon="add"
              @click.native="showModal('upload-photos')"
            )
          .section__content.x-section_padding_top
            card-list(props="props" :items="[{}, {}, {}, {}, {}, {}]")
              template(slot-scope="card")
                card-photo(view="simple")
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
import slideButton from "../buttonSlide.vue";
import cardList from "../cardList.vue";
import cardPhoto from "../cardPhoto.vue";
import footer from "../footer.vue";
import header from "../header.vue";
import likesDisplay from "../likes-display.vue";

const modals = namespace("modals");
const albums = namespace("albums");

@Component({
  components: {
    appFooter: footer,
    appHeader: header,
    likesDisplay,
    slideButton,
    cardList,
    cardPhoto
  },
  name: "AlbumPage"
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
