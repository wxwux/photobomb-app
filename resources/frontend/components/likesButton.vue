<template lang="pug">
  button(
    type="text"
  ).like-btn-component 20
    
</template>

<script lang="ts">
import Vue from "vue";
import { Component } from "vue-property-decorator";

@Component({
  name: "LikesButton"
})
export default class LikesButton extends Vue {}
</script>


<style lang="pcss" scoped src="styles/likesButton.pcss"></style>

