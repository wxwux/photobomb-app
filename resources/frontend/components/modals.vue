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
          :is="currentModal"
          :key="currentModal"
          :options="options"
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
import userEdit from "./modalsUserEdit.vue";

const modals: BindingHelpers = namespace("modals");

@Component({
  name: "Modals",
  components: { albums, uploadPhotos, photoEdit, photoDetails, userEdit }
})
export default class Modals extends Vue {
  @modals.State((state: ModalsState) => state.currentModal)
  public currentModal!: string;

  @modals.State((state: ModalsState) => state.options)
  public options!: string;

  @modals.Mutation("clearModal")
  public clearModal!: void;

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