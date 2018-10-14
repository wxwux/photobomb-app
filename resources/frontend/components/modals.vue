<template lang="pug">
  #modals-container.modals(:class="{active: currentModal.length}")
    .modals__layout
    .modals__container
      component(
        v-for="modal in modals"
        v-if="currentModal === modal"
        :is="modal"
        :key="modal"
      ) 
          
</template>

<script lang="ts">
import Vue from "vue";
import { Component, Watch } from "vue-property-decorator";
import { namespace, State } from "vuex-class";
import { ModalsState } from "../store/modules/modals/types";
import albums from "./modalsAlbum.vue";
import uploadPhotos from "./modalsUploadPhotos.vue";

const modals = namespace("modals");

@Component({
  name: "Modals",
  components: { albums, uploadPhotos }
})
export default class Modals extends Vue {
  @modals.State((state: ModalsState) => state.currentModal)
  public currentModal!: string;

  public modals: string[] = ["albums", "upload-photos"];
}
</script>
<style lang="pcss" src="styles/modals.pcss" scoped></style> 