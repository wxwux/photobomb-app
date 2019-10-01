<template lang="pug">
  div
    .root__header
      app-header(
        :coverFileName="userDetails.background"
        coverPath="/uploads/user/origin"
      )
        template(slot="header-bottom")
          .search-container
            search
    main.root__content
      section.x-section.section--white
        .x-container
          h1.x-section-title Новое в мире 
          .section__content
            card-list(props="props" :items="recentPhotos")
              template(slot-scope="{item: card}")
                card-photo(
                  :card="card"
                )
          .section__load-btn(v-if="Boolean(pagination.next)")
            .section__load-btn-container
              round-button(
                @click="loadMore"
                :blocked="loadBtnBlocked"
              )
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
      app-footer(
        :coverFileName="userDetails.background"
        coverPath="/uploads/user/origin"
      )
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import { Mutation, namespace, State, Getter } from "vuex-class";
import { AlbumItem } from "../../store/modules/albums/types";
import roundButton from "../buttonRound.vue";
import slideButton from "../buttonSlide.vue";
import cardAlbum from "../cardAlbum.vue";
import cardList from "../cardList.vue";
import cardPhoto from "../cardPhoto.vue";
import footer from "../footer.vue";
import header from "../header.vue";
import search from "../search.vue";
import { BindingHelpers } from "vuex-class/lib/bindings";
import { Photo, Pagination } from "../../store/modules/photos/types";
import { UserState, UserDetails } from "../../store/modules/user/types";

const modals: BindingHelpers = namespace("modals");
const albums: BindingHelpers = namespace("albums");
const photos: BindingHelpers = namespace("photos");
const user: BindingHelpers = namespace("user");

@Component({
  components: {
    appFooter: footer,
    appHeader: header,
    cardAlbum,
    cardList,
    cardPhoto,
    roundButton,
    slideButton,
    search
  },
  name: "MainPage"
})
export default class MainPage extends Vue {
  @user.Action("getUserInfo")
  public getUserInfo;

  @user.State((state: UserState) => state.userDetails)
  public userDetails!: UserDetails;

  @modals.Mutation("showModal")
  public showModal!: void;

  @albums.Action("fetchUserAlbums")
  public fetchUserAlbums!: any;

  @albums.State(state => state.data)
  public userAlbums!: AlbumItem[];

  @photos.Action("getRecentPhotos")
  public getRecentPhotos;

  @photos.State(state => state.recentPhotos.data)
  public recentPhotos!: Photo[];

  @photos.State(state => state.recentPhotos.links)
  public pagination!: Pagination;

  @photos.Action("getMoreRecentPhotos")
  public getMoreRecentPhotos;

  public cardCurrentlyLoadedId: number | null = null;

  public loadBtnBlocked: boolean = false;

  public loadBtnShown: boolean = true;

  public blurOthers(cardId) {
    this.cardCurrentlyLoadedId = cardId;
  }

  public created() {
    this.fetchUserAlbums();
    this.getRecentPhotos();
    this.getUserInfo();
  }

  public async loadMore() {
    const nextLink: string = this.pagination.next;
    this.loadBtnBlocked = true;

    try {
      await this.getMoreRecentPhotos(nextLink);
    } catch (error) {
      console.error(error);
    } finally {
      this.loadBtnBlocked = false;
    }
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
