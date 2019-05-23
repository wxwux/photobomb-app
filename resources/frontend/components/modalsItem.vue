<template lang="pug">
  .modal(v-if="view === 'template'")
    .modal__header
      .modal__title {{title}}
      .modal__close(
        @click="closeModal"
      )
    .modal__content
      slot(name="modal-content")
    .modal__buttons
      slot(name="modal-buttons")

  .modal.modal--view_blank(v-else-if="view === 'blank'")
    slot(name="modal-content")
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

  @Prop({default: "template"})
  public view!: string;

  @modals.Mutation("clearModal")
  public clearModal;

  public closeModalByEsc(e) {
    if (e.keyCode === 27) {
      this.closeModal();
    }
  }

  public closeModal() {
    this.clearModal();
    this.$emit("onClose");
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
