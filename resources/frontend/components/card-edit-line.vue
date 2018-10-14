<template lang="pug">
  .card-edit-line {{title}}
</template>
<script lang="ts">
import Vue from "vue";
import { Component, Prop } from "vue-property-decorator";

@Component({
  name: "CardEditLine"
})
export default class CardAlbum extends Vue {
  @Prop({default: "Название альбом"})
  public title!: string;
}
</script>

<style lang="pcss" src="styles/card-edit-line.pcss" scoped></style>
