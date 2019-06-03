<template lang="pug">
  div
    .root__header
      app-header(
        view="album-view"
        :headerData="currentAlbum"
        :coverFileName="currentAlbum.cover"
        coverPath="/uploads/albums_covers/origin"
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
            card-list(props="props" :items="uploadedPhotos.photos")
              template(slot-scope="{item: card}")
                card-photo(
                  view="simple"
                  :card="card"
                  @onEdit="onEdit"
                )
    .root__footer
      app-footer(
        :footerData="currentAlbum"
        :coverFileName="currentAlbum.cover"
        coverPath="/uploads/albums_covers/origin"
      )
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import { Mutation, namespace, State } from "vuex-class";
import { AlbumItem } from "../../store/modules/albums/types";
import slideButton from "../buttonSlide.vue";
import cardList from "../cardList.vue";
import cardPhoto from "../cardPhoto.vue";
import footer from "../footer.vue";
import header from "../header.vue";
import likesDisplay from "../likes-display.vue";
import { BindingHelpers } from "vuex-class/lib/bindings";
import { UploadedPhotos } from "../../store/modules/photos/types";

const modals: BindingHelpers = namespace("modals");
const albums: BindingHelpers = namespace("albums");
const photos: BindingHelpers = namespace("photos");

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
  public showModal;

  @albums.Action("fetchAlbumById")
  public fetchAlbumById!: any;

  @photos.Action("fetchPhotos")
  public fetchPhotos!: any;

  @photos.State((state) => state.uploadedPhotos)
  public uploadedPhotos!: UploadedPhotos;

  @photos.Mutation("setPhotoToEdit")
  public setPhotoToEdit;

  @albums.State((state) => state.currentAlbum)
  public currentAlbum!: AlbumItem;

  public onEdit(albumId: number): void {
    this.showModal("photo-edit");
    this.setPhotoToEdit(albumId);
  }

  public created(): void {
    this.fetchAlbumById(this.$route.params.id);
  }

  public async mounted(): Promise<any> {
    const albumId: number = Number(this.$route.params.id);
    await this.fetchPhotos(albumId);
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
