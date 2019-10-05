<template lang="pug">
  #modal-album-wrapper
    modals-item(
      title="Редактировать фотографию"
    )
      template(slot="modal-content")
        .modal__row
          label.modal__block
            .modal__block-title Название
            .modal__block-control 
              input-rounded(
                placeholder="Введите название фотографии"
                v-model="editedPhotoItem.title"
                :error="validation.hasError('editedPhotoItem.title')"
              )
        .modal__row
          label.modal__block
            .modal__block-title Описание
            .modal__block-control 
              input-rounded(
                element="textarea"
                placeholder="Введите описание фотографии"
                v-model="editedPhotoItem.description"
                :error="validation.hasError('editedPhotoItem.description')"
              )
      template(slot="modal-buttons")
        .modal__buttons-common
          .modal__buttons-elem
            button-round(
              text="Сохранить"
              :filled="true"
              @click="editPhoto"
              :disabled="!!validation.allErrors().length"
            )
          .modal__buttons-elem
            button-round(
              text="Отменить"
              bgClass="transparent"
              @click="clearModal"
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
import SimpleVueValidator from "simple-vue-validator";
import { Validator } from "simple-vue-validator";
import Vue from "vue";
import { mixins } from "vue-class-component";
import { Component, Prop } from "vue-property-decorator";
import { Action, Mutation, namespace } from "vuex-class";
import buttonRound from "./buttonRound.vue";
import inputRounded from "./inputRounded.vue";
import modalsItem from "./modalsItem.vue";
import { Photo } from "../store/types";
import { BindingHelpers, BindingHelper } from "vuex-class/lib/bindings";

const modals: BindingHelpers = namespace("modals");
const photos: BindingHelpers = namespace("photos");
const alerts: BindingHelpers = namespace("alerts");
const albums: BindingHelpers = namespace("albums");

@Component({
  name: "ModalsPhotoEdit",
  validators: {
    "editedPhotoItem.title"(value) {
      return Validator.value(value).required("Заголовок не может быть пустым");
    },
    "editedPhotoItem.description"(value) {
      return Validator.value(value).required("Описание не может быть пустым");
    }
  },
  components: { inputRounded, buttonRound, modalsItem }
})
export default class ModalsAlbum extends mixins() {
  @modals.Mutation("clearModal")
  public clearModal;

  @alerts.Mutation("showAlerts")
  public showAlerts;

  @photos.Action("updatePhoto")
  public updatePhoto;

  @albums.State(state => state.photoToEdit)
  public photoToEdit;

  public editedPhotoItem: Photo = {
    id: 0,
    title: "",
    description: ""
  };

  public mounted() {
    this.editedPhotoItem = this.photoToEdit;
  }

  public async editPhoto() {
    const success = await this.$validate();
    if (!success) {
      return;
    }

    try {
      await this.updatePhoto(this.editedPhotoItem);
      this.showAlerts({
        type: "success",
        messages: ["Фотография изменена"]
      });
    } catch (error) {
      this.showAlerts({
        type: "error",
        messages: ["Ошибка. Не удалось добавить альбом"]
      });
    } finally {
      this.clearModal();
    }
  }
}
</script>


<style lang="pcss" scoped src="styles/modals.pcss"></style>
<style lang="pcss" scoped src="styles/modalsAlbum.pcss"></style>
