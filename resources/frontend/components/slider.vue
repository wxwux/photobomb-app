<template lang="pug">
  .slider-comp-wrapper
    .slider__inner
      .slider__picture
        img(:src="imgPath").slider__picture-display
      .slider__buttons
        button(
          v-if="prevIsHidden === false"
          type="button"
          @click="$emit('onPrev')"
        ).slider__btn.slider__btn--left
        button(
          v-if="nextIsHidden === false"
          type="button"
          @click="$emit('onNext')"
        ).slider__btn.slider__btn--right
</template>

<script lang="ts">
import Vue from "vue";
import { Component, Prop } from "vue-property-decorator";

@Component({
  name: "Slider"
})
export default class ModalsAlbum extends Vue {
  @Prop({ default: "" })
  public imgPath!: string;

  @Prop({ default: false })
  public nextIsHidden!: boolean;

  @Prop({ default: false })
  public prevIsHidden!: boolean;
}
</script>


<style lang="pcss" scoped src="styles/slider.pcss"></style>