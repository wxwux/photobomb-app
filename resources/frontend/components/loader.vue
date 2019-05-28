<template lang="pug">
  .loader-component(
    :class="`loader-component--color-${color}`"
  )
</template>

<script lang="ts">
import Component from "vue-class-component";
import { Prop } from "vue-property-decorator";
import Vue from "vue";

@Component({
  name: "Loader"
})
export default class Loader extends Vue {
  @Prop({ default: "blue" })
  public color!: string;
}
</script>

<style lang="postcss" scoped src="styles/loader.pcss"></style>


