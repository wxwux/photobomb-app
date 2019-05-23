<template lang="pug">
  #modals-container.modals(
    :class="{active: modalHasShown}"
  )
    .modals__layout(
      @click="clearModal"
    )
    .modals__positioner
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
import { BindingHelpers } from "vuex-class/lib/bindings";
import { Component, Watch } from "vue-property-decorator";
import { namespace, State } from "vuex-class";
import { ModalsState } from "../store/modules/modals/types";

import albums from "./modalsAlbum.vue";
import uploadPhotos from "./modalsUploadPhotos.vue";
import photoEdit from "./modalsPhotoEdit.vue";
import photoDetails from "./modalsPhotoDetails.vue";

const modals: BindingHelpers = namespace("modals");

@Component({
  name: "Modals",
  components: { albums, uploadPhotos, photoEdit, photoDetails }
})
export default class Modals extends Vue {
  @modals.State((state: ModalsState) => state.currentModal)
  public currentModal!: string;

  @modals.Mutation("clearModal")
  public clearModal!: void;

  public modals: string[] = ["albums", "upload-photos", "photo-edit", "photo-details"];

  get modalHasShown() {
    return !!this.currentModal.length;
  }

  @Watch("modalHasShown")
  public lockTheBody(val: boolean) {
    if (val) {
      document.body.classList.add("locked");
    } else {
      document.body.classList.remove("locked");
    }
  }

}
</script>
<style lang="pcss" src="styles/modals.pcss" scoped></style> 