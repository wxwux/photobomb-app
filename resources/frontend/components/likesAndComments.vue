<template lang="pug">
  .lac
    .lac__comments {{comments}}
    .lac__likes {{likes}}
</template>
<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import { Prop } from "vue-property-decorator";

@Component({
  name: "Likes-And-Comments"
})
export default class LikesAndComments extends Vue {
  @Prop({default: 0})
  public likes!: number;

  @Prop({default: 0})
  public comments!: number;
}
</script>
<style lang="pcss" src="styles/likesAndComments.pcss" scoped></style>
