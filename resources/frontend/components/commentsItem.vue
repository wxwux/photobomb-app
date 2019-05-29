<template lang="pug">
  .new-comment-component
    .comment__avatar
      img(src="https://picsum.photos/100/100").comment__avatar-pic
    .comment__data
      .comment__user Антон Черепов

      template(
        v-if="createmode"
      )
        .comment__input-fields
          rounded-input(
            element="textarea"
            placeholder="Добавить комментарий"
            v-model="comment.content"
          ).comment__input
          button-round(
            text="Добавить"
            @click="addNewComment"
            :blocked="btnBlocked"
          )

      template(
        v-else
      )
        .comment__texts
          p {{data.content}}
</template>

<script lang="ts">
import Vue from "vue";
import { Component, Prop } from "vue-property-decorator";
import roundedInput from "./inputRounded.vue";
import buttonRound from "./buttonRound.vue";
import { namespace } from "vuex-class";
import { BindingHelpers } from "vuex-class/lib/bindings";
import { Comment, Photo } from "../store/modules/photos/types";

const photos: BindingHelpers = namespace("photos");

@Component({
  name: "CommentsNew",
  components: {
    roundedInput,
    buttonRound
  }
})
export default class CommentsItem extends Vue {
  @Prop({ default: false })
  public createmode!: boolean;

  @Prop()
  public belongsTo!: Photo;

  @Prop()
  public data!: Comment;

  public comment: Comment = {
    photo_id: 0,
    content: ""
  };

  public btnBlocked: boolean = false;

  @photos.Action("addComment")
  public addComment;

  public async addNewComment(): Promise<any> {
    this.btnBlocked = true;
    try {
      this.comment.photo_id = this.belongsTo.id as number;
      await this.addComment(this.comment);

      this.comment.content = "";
    } catch (error) {
      console.log(error);
    } finally {
      this.btnBlocked = false;
    }
  }
}
</script>


<style lang="pcss" scoped src="styles/commentsNew.pcss"></style>
