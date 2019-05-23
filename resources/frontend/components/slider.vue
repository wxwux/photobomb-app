<template lang="pug">
  .slider-comp-wrapper
    .slider__inner
      .slider__picture
        img(src="https://picsum.photos/1000/1000").slider__picture-display
      .slider__buttons
        button(
          type="button"
        ).slider__btn.slider__btn--left
        button(
          type="button"
        ).slider__btn.slider__btn--right
</template>

<script lang="ts">
import Vue from "vue";
import { Component, Prop } from "vue-property-decorator";

@Component({
  name: "Slider"
})
export default class ModalsAlbum extends Vue {}
</script>


<style lang="pcss" scoped src="styles/slider.pcss"></style>

