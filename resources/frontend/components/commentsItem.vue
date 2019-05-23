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
          ).comment__input
          button-round(
            text="Добавить"
          )

      template(
        v-else
      )
        .comment__texts
          p Душа моя озарена неземной радостью, как эти чудесные весенние утра, которыми я наслаждаюсь от всего сердца. Я совсем один и блаженствую в здешнем краю, словно созданном для таких, как я. Я так счастлив, мой друг, так упоен ощущением. Душа моя озарена неземной радостью, как эти чудесные весенние утра, которыми я наслаждаюсь от всего сердца.
</template>

<script lang="ts">
import Vue from "vue";
import {Component, Prop} from "vue-property-decorator";
import roundedInput from "./inputRounded.vue";
import buttonRound from "./buttonRound.vue";

@Component({
  name: "CommentsNew",
  components: {
    roundedInput, buttonRound
  }
})
export default class CommentsItem extends Vue {
  @Prop({default: false})
  public createmode!: boolean;
}
</script>


<style lang="pcss" scoped src="styles/commentsNew.pcss"></style>
