<template lang="pug">
  .comments-component
    .comments__title Комментарии
    .comments__new.comments__row
      comments-item(
        :createmode="true"
        :belongsTo="belongsTo"
      )
    .comments__row(
      v-for="comment in comments" :key="comment.id"
      v-if="comments.length"
    )
      comments-item(
        :data="comment"
      )
</template>

<script lang="ts">
import Vue from "vue";
import commentsItem from "./commentsItem.vue";
import { Component, Prop } from "vue-property-decorator";
import { Photo, Comment } from "../store/modules/photos/types";
@Component({
  name: "Comments",
  components: {
    commentsItem
  }
})
export default class Comments extends Vue {
  @Prop()
  public belongsTo!: Photo;


  @Prop()
  public comments!: Comment[];
}
</script>


<style lang="pcss" scoped src="styles/comments.pcss"></style>

