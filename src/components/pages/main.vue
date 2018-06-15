<template lang="pug">
  div
    section.x-section.section--white
      .x-container
        h1.x-section-title Новое в мире 
        .section__content
          card-list
            div(slot-scope="{item}") {{item}}
              card-photo
        .section__load-btn
          round-button 
    section.section.section--gray
      .x-container
        .albums-title
          h2.x-section-title Мои альбомы
          .albums-title__button
            slideButton(
              text="Добавить",
              icon="add"
            )
        card-list(:itemsInRow="4")
          div
            card-album

</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import roundButton from "../buttonRound.vue";
import slideButton from "../buttonSlide.vue";
import cardAlbum from "../cardAlbum.vue";
import cardList from "../cardList.vue";
import cardPhoto from "../cardPhoto.vue";

@Component({
  components: {
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
