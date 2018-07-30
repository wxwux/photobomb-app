<template lang="pug">
  div
    .root__header
      app-header
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
              slideButton(
                text="Добавить"
                icon="add"
              )
          card-list(:itemsInRow="4")
            div(slot-scope="{item}")
              card-album
    .root__footer
      app-footer
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import roundButton from "../buttonRound.vue";
import slideButton from "../buttonSlide.vue";
import cardAlbum from "../cardAlbum.vue";
import cardList from "../cardList.vue";
import cardPhoto from "../cardPhoto.vue";
import footer from "../footer.vue";
import header from "../header.vue";

@Component({
  components: {
    appFooter: footer,
    appHeader: header,
    cardAlbum, cardList, cardPhoto, roundButton, slideButton
  },
  name: "MainPage"
})
export default class MainPage extends Vue {

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
