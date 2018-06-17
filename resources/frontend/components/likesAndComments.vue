<template lang="pug">
  .lac
    .lac__comments 15
    .lac__likes 9
</template>
<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";

@Component({
  name: "Likes-And-Comments"
})
export default class LikesAndComments extends Vue {

}
</script>
<style lang="pcss" src="styles/likesAndComments.pcss" scoped></style>
