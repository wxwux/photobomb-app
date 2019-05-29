<template lang="pug">
  .modals-user-edit-component  
    modals-item(
      title="Редактировать профиль"
    ) 
      template(slot="modal-content")
        .modal__part
          .modal__row
            label.modal__block
              .modal__block-title Имя
              .modal__block-control 
                input-rounded(
                  placeholder="Введите имя"
                )
          .modal__row
            label.modal__block
              .modal__block-title О себе
              .modal__block-control 
                input-rounded(
                  element="textarea"
                  placeholder="Расскажите о себе"
                )
          .modals__row
            cover-loader(
              fileRestrictionText="500 КБ"
              buttonText="Загрузить фотографию"
            )
          .modals__row
            cover-loader(
              fileRestrictionText="1.5 МБ"
              buttonText="Загрузить фон"
            )

        .modal__part.modal__socials
          .modal__row
            label.modal__block
              .modal__block-title Вконтакте
              .modal__block-control 
                input-rounded(
                  placeholder="http://vk.com/"
                )
          .modal__row
            label.modal__block
              .modal__block-title Facebook
              .modal__block-control 
                input-rounded(
                  placeholder="http://facebook.com/"
                )
          .modal__row
            label.modal__block
              .modal__block-title Email
              .modal__block-control 
                input-rounded(
                  placeholder="name@domain.com"
                )
          .modal__row
            label.modal__block
              .modal__block-title Twitter
              .modal__block-control 
                input-rounded(
                  placeholder="http://twitter.com/"
                )
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
</template>

<script lang="ts">
import { Component } from "vue-property-decorator";
import modalsItem from "./modalsItem.vue";
import inputRounded from "./inputRounded.vue";
import coverLoader from "./coverLoader.vue";
import buttonRound from './buttonRound.vue';

import Vue from "vue";
@Component({
  name: "ModalsUserEdit",
  components: {
    modalsItem,
    inputRounded,
    coverLoader,
    buttonRound
  }
})
export default class ModalsUserEdit extends Vue {}
</script>


<style lang="pcss" scoped src="styles/modals.pcss"></style>