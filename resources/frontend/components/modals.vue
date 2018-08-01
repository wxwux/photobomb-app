<template lang="pug">
  #modals-container.modals(:class="{active: currentModal.length}")
    .modals__layout
    .modals__container  
      modals-album(
        v-if="currentModal === 'albums'"
      )
          
</template>

<script lang="ts">
import Vue from "vue";
import { Component, Watch } from "vue-property-decorator";
import { namespace, State } from "vuex-class";
import { ModalsState } from "../store/modules/modals/types";
import modalsAlbum from "./modalsAlbum.vue";

const modals = namespace("modals");

@Component({
  name: "Modals",
  components: { modalsAlbum }
})
export default class Modals extends Vue {
  @modals.State((state: ModalsState) => state.currentModal)
  public currentModal!: string;

  public mounted() {
    console.log(this.currentModal);
  }

  // @Watch("currentModal")
  // public transitionModal(val: string) {

  // }
}
</script>
<style lang="pcss" src="styles/modals.pcss" scoped></style> 