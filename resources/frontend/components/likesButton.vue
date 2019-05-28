<template lang="pug">
  button(
    type="text"
  ).like-btn-component {{amount}}
    
</template>

<script lang="ts">
import Vue from "vue";
import { Component, Prop } from "vue-property-decorator";

@Component({
  name: "LikesButton"
})
export default class LikesButton extends Vue {
  @Prop({default: 0})
  public amount!: number;
}
</script>


<style lang="pcss" scoped src="styles/likesButton.pcss"></style>

