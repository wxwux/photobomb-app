<template lang="pug">
  button(
    v-on="$listeners"
  ).slide-button
    .slide-button__content
      .slide-button__icon(
        :class="`slide-button__icon--${icon}`"
      )
      .slide-button__text {{text}}
</template>
<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import { Prop } from "vue-property-decorator";

const icons: string[] = ["edit", "add", "home"];

@Component({
  name: "SlideButton"
})
export default class SlideButton extends Vue {
  @Prop({
    default: "edit",
    validator: (value: string) => icons.indexOf(value) !== -1
  })
  public icon!: string;

  @Prop({default: "Button"})
  public text!: string;
}
</script>
<style src="styles/buttonSlide.pcss" lang="pcss" scoped>
</style>
