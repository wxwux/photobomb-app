<template lang="pug">
  .modal
    .modal__header
      .modal__title {{title}}
      .modal__close
    .modal__content
      slot(name="modal-content")
    .modal__buttons
      slot(name="modal-buttons")
</template>

<script lang="ts">
import Vue from "vue";
import {Component, Prop} from "vue-property-decorator";

@Component({
  name: "ModalsItem"
})
export default class ModalsItem extends Vue {

  @Prop({default: "Модальное окно"})
  public title!: string;
}

</script>

<style lang="pcss" src="styles/modalsItem.pcss" scoped></style>
