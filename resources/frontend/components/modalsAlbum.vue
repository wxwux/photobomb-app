<template lang="pug">
  #modal-album-wrapper
    modals-item(
      title="Добавить альбом"
    )
      template(slot="modal-content")
        .modal__row
          label.modal__block
            .modal__block-title Название
            .modal__block-control 
              input-rounded(
                placeholder="Введите название альбома"
              )
        .modal__row
          label.modal__block
            .modal__block-title Описание
            .modal__block-control 
              input-rounded(
                element="textarea"
              )
        .modal__row.cover
          .modal__block-title.cover__left-col
            .cover__thumb
          .modal__block-control.cover__right-col
            .cover__btn
              button-round(
                text="Загрузить обложку"
                purpose="file"
              )
            .cover__desc
              | (файл должен быть размером не более 1024 КБ)
      template(slot="modal-buttons")
        .modal__buttons-common
          .modal__buttons-elem
            button-round(
              text="Сохранить"
              :filled="true"
            )
          .modal__buttons-elem
            button-round(
              text="Отменить"
              bgClass="transparent"
            )
        .modal__button-right
          button-round(
            text="Удалить"
            bgClass="red"
            icon="trash"
            :filled="true"
          )  
</template>

<script lang="ts">
import Vue from "vue";
import { Component, Prop } from "vue-property-decorator";
import buttonRound from "./buttonRound.vue";
import inputRounded from "./inputRounded.vue";
import modalsItem from "./modalsItem.vue";


@Component({
  name: "ModalsAlbum",
  components: { inputRounded, buttonRound, modalsItem }
})
export default class ModalsAlbum extends Vue {}
</script>


<style lang="pcss" scoped src="styles/modals.pcss"></style>
<style lang="pcss" scoped src="styles/modalsAlbum.pcss"></style>
