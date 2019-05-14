<template lang="pug">
  .uploader-item(
    :style="{backgroundImage: `url('${pic.url}'`}"
  )
    .uploader-item__close(
      v-if="hideRemoveBtn === false"
      @click="$emit('removeItem', pic.id)"
    )
</template>

<script lang="ts">
import Vue from "vue";
import { Component, Emit, Prop } from "vue-property-decorator";
import { renderFile } from "../helpers/files";

@Component({
  name: "UploadItem"
})
export default class UploaderItem extends Vue {
  @Prop()
  public pic!: string;

  @Prop({default: false})
  public hideRemoveBtn!: boolean;
}
</script>

<style lang="pcss" scoped src="styles/uploader-item.pcss"></style>
