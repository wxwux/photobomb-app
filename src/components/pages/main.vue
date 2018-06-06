<template lang="pug">
  section.section.section--white
    .container
      h1.section-title Новое в мире 
      .section__content
        card-list
          div(slot-scope="{item}") {{item}}
            card-photo
      .section__load-btn
        round-button 
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import roundButton from "../buttonRound.vue";
import cardList from "../cardList.vue";
import cardPhoto from "../cardPhoto.vue";

@Component({
  components: {
    cardList, cardPhoto, roundButton
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
</style>
