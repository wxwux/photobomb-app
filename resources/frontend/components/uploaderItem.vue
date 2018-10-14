<template lang="pug">
  .uploader-item
    .uploader-item__pic Картинка
    .uploader-item__close
</template>

<script lang="ts">
import Vue from "vue";
import { renderFile } from "../helpers/files";
export default class UploaderItem extends Vue {

}
</script>

<style lang="pcss" scoped src="styles/uploader-item.pcss"></style>
