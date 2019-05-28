<template lang="pug">
  .comments-component
    .comments__title Комментарии
    .comments__new.comments__row
      comments-item(
        :createmode="true"
        :belongsTo="belongsTo"
      )
    .comments__row
      comments-item
</template>

<script lang="ts">
import Vue from "vue";
import commentsItem from "./commentsItem.vue";
import { Component, Prop } from "vue-property-decorator";
import { Photo } from "../store/modules/photos/types";
@Component({
  name: "Comments",
  components: {
    commentsItem
  }
})
export default class Comments extends Vue {
  @Prop()
  public belongsTo!: Photo;
}
</script>


<style lang="pcss" scoped src="styles/comments.pcss"></style>

