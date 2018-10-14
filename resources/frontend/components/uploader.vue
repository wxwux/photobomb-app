<template lang="pug">
  .uploader
    label.uploader__elem(
      :class="{active: isActiveView}"
      @dragover="isActiveView = true"
      @dragleave="isActiveView = false"
    )
      input(
        type="file"
        multiple="true"
      ).uploader__real
      .uploader__items
        uploader-item(v-for="n in 10")
      .uploader__desc 
        span.uploader__desc-text Перетащите фото сюда или #[a.uploader__link выберите файл]

</template>

<script lang="ts">
import Vue from "vue";
import { Component } from "vue-property-decorator";
import uploaderItem from "./uploaderItem.vue";

@Component({
  name: "Uploader",
  components: { uploaderItem }
})
export default class Uploader extends Vue {
  public isActiveView: boolean = false;
}
</script>

<style lang="pcss" scoped src="styles/uploader.pcss"></style>
