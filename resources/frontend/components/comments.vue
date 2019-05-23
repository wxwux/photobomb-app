<template lang="pug">
  .comments-component
    .comments__title Комментарии
    .comments__new.comments__row
      comments-item(
        :createmode="true"
      )
    .comments__row
      comments-item
</template>

<script lang="ts">
import Vue from "vue";
import commentsItem from "./commentsItem.vue";
import { Component } from "vue-property-decorator";
@Component({
  name: "Comments",
  components: {
    commentsItem
  }
})
export default class Comments extends Vue {}
</script>


<style lang="pcss" scoped src="styles/comments.pcss"></style>

