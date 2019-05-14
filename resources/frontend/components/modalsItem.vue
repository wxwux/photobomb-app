<template lang="pug">
  .modal
    .modal__header
      .modal__title {{title}}
      .modal__close(
        @click="clearModal"
      )
    .modal__content
      slot(name="modal-content")
    .modal__buttons
      slot(name="modal-buttons")
</template>

<script lang="ts">
import Vue from "vue";
import { Component, Prop } from "vue-property-decorator";
import { Mutation, namespace } from "vuex-class";

const modals = namespace("modals");

@Component({
  name: "ModalsItem"
})

export default class ModalsItem extends Vue {
  @Prop({ default: "Модальное окно" })
  public title!: string;

  @modals.Mutation("clearModal")
  public clearModal;

  public closeModalByEsc(e) {
    if (e.keyCode === 27) {
      this.clearModal();
    }
  }

  public mounted() {
    document.addEventListener("keydown", this.closeModalByEsc);
  }

  public destroyed() {
    document.removeEventListener("keydown", this.closeModalByEsc);
  }
}
</script>

<style lang="pcss" src="styles/modalsItem.pcss" scoped></style>
