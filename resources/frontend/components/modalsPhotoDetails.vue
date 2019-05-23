<template lang="pug">
  #modal-photo-detail
    modals-item(
      view="blank"
    )
      template(slot="modal-content")
        .inner-content
          slider
          .details
            .details__header
              .details__user
                .user
                  img(src="https://picsum.photos/100/100").user__avatar
                  .user__name Анна Богданова
              .details__likes
                likes-button
            .details__data    
              .details__title Путешествие на трамвайчике
              .details__text 
                p text text text
        
          


</template>

<script lang="ts">
import Vue from "vue";
import { Component, Prop } from "vue-property-decorator";
import modalsItem from "./modalsItem.vue";
import likesButton from "./likesButton.vue";
import slider from "./slider.vue";

@Component({
  name: "ModalsPhotoEdit",
  components: { modalsItem, slider, likesButton }
})
export default class ModalsAlbum extends Vue {}
</script>


<style lang="pcss" scoped src="styles/modalsPhotoDetails.pcss"></style>
