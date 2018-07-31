<template lang="pug">
  #modals-container.modals
    .modals__layout
    .modals__container  
      modals-album()
          
</template>

<script lang="ts">
import Vue from "vue";
import { Component } from "vue-property-decorator";
import modalsAlbum from "./modalsAlbum.vue";

@Component({
  name: "Modals",
  components: { modalsAlbum }
})
export default class Modals extends Vue {}
</script>
<style lang="pcss" src="styles/modals.pcss" scoped></style> 