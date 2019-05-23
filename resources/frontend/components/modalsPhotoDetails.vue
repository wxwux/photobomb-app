
<template lang="pug">
  #modal-photo-detail
    modals-item(
      view="blank"
    )
      template(slot="modal-content")
        slider


</template>

<script lang="ts">
import Vue from "vue";
import { Component, Prop } from "vue-property-decorator";
import modalsItem from "./modalsItem.vue";
import slider from "./slider.vue";

@Component({
  name: "ModalsPhotoEdit",
  components: { modalsItem, slider }
})
export default class ModalsAlbum extends Vue {}
</script>


<style lang="pcss" scoped src="styles/modals.pcss"></style>
<style lang="pcss" scoped src="styles/modalsAlbum.pcss"></style>
