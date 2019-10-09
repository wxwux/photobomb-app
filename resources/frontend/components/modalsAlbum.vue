<template lang="pug">
  #modal-album-wrapper
    modals-item(
      title="Добавить альбом"
      :blocked="formIsBlocked"
    )
      template(slot="modal-content")
        .modal__row
          label.modal__block
            .modal__block-title Название
            .modal__block-control 
              input-rounded(
                placeholder="Введите название альбома"
                v-model="newAlbum.title"
                :error="validation.firstError('newAlbum.title')"
                hideErrorText
              )
        .modal__row
          label.modal__block
            .modal__block-title Описание
            .modal__block-control 
              input-rounded(
                element="textarea"
                v-model="newAlbum.desc"
                :error="validation.firstError('newAlbum.desc')"
                hideErrorText
              )

        .modal__row
          cover-loader(
            @onCoverUploaded="file => newAlbum.cover = file"
            :errorText="validation.firstError('newAlbum.cover')"
            fileRestrictionText="1.5 МБ"
          )

      template(slot="modal-buttons")
        .modal__buttons-common
          .modal__buttons-elem
            button-round(
              text="Сохранить"
              :filled="true"
              @click="createNewAlbum"
              :disabled="!!validation.allErrors().length"
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
            @click="removeCurrentAlbum"
          )  
</template>

<script lang="ts">
import SimpleVueValidator, { Validator } from "simple-vue-validator";
import Vue from "vue";
import { mixins } from "vue-class-component";
import { Component, Prop } from "vue-property-decorator";
import { Action, Mutation, namespace } from "vuex-class";
import { renderFile } from "../helpers/files";
import { AlbumItem } from "../store/modules/albums/types";
import buttonRound from "./buttonRound.vue";
import inputRounded from "./inputRounded.vue";
import modalsItem from "./modalsItem.vue";
import coverLoader from "./coverLoader.vue";

const albums = namespace("albums");
const modals = namespace("modals");
const alerts = namespace("alerts");

@Component({
  name: "ModalsAlbum",
  validators: {
    "newAlbum.title"(value) {
      return Validator.value(value).required("Заголовок не может быть пустым");
    },
    "newAlbum.desc"(value) {
      return Validator.value(value).required("Описание не может быть пустым");
    },
    "newAlbum.cover"(value) {
      return Validator.custom(() => {
        if (
          ["image/jpeg", "image/png", "image/jpg"].indexOf(value.type) === -1
        ) {
          return "Файл должен быть изображением (jpg, png)";
        }

        if (value.size > 1500000) {
          return "Файл весит больше чем 1.5 Мб";
        }
      });
    }
  },
  components: { inputRounded, buttonRound, modalsItem, coverLoader }
})
export default class ModalsAlbum extends mixins() {
  @albums.Action("createNewAlbum")
  public createAlbumAction: any;

  @modals.Mutation("clearModal")
  public closeModal!: any;

  @alerts.Mutation("showAlerts")
  public showAlerts;

  @albums.State(state => state.currentAlbum)
  public currentAlbum;

  @albums.Action("removeAlbum")
  public removeAlbum;

  @Prop({ default: () => ({}) })
  public options;

  public newAlbum: AlbumItem = {
    id: 0,
    title: "",
    desc: "",
    cover: null
  };

  public formIsBlocked: boolean = false;

  public clearFormData() {
    const coverElem: HTMLElement = this.$refs.cover as HTMLElement;

    this.newAlbum.id = 0;
    this.newAlbum.title = "";
    this.newAlbum.desc = "";
    this.newAlbum.cover = "";
  }

  public async createNewAlbum() {
    const formData: FormData = new FormData();
    const success = await this.$validate();

    if (!success) {
      return;
    }

    Object.keys(this.newAlbum).forEach(prop => {
      formData.append(prop, this.newAlbum[prop]);
    });

    try {
      const albumCreated = await this.createAlbumAction(formData);
      this.showAlerts({
        type: "success",
        messages: ["Альбом добавлен"]
      });
    } catch (error) {
      this.showAlerts({
        type: "error",
        messages: ["Ошибка. Не удалось добавить альбом"]
      });
    }
    this.closeModal();
  }

  public async removeCurrentAlbum() {
    this.formIsBlocked = true;

    try {
      await this.removeAlbum(this.currentAlbum.id);
      this.showAlerts({
        type: "success",
        messages: ["Альбом удален"]
      });
    } catch (error) {
      this.showAlerts({
        type: "error",
        messages: ["Ошибка. Альбом не удалось добвить"]
      });
    } finally {
      this.closeModal();
      this.formIsBlocked = false;
    }
  }

  public beforeDestroy() {
    this.clearFormData();
  }
}
</script>


<style lang="pcss" scoped src="styles/modals.pcss"></style>
<style lang="pcss" scoped src="styles/modalsAlbum.pcss"></style>
