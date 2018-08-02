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
                v-model="newAlbum.title"
                :error="validation.hasError('newAlbum.title')"
              )
        .modal__row
          label.modal__block
            .modal__block-title Описание
            .modal__block-control 
              input-rounded(
                element="textarea"
                v-model="newAlbum.desc"
                :error="validation.hasError('newAlbum.desc')"
              )
        .modal__row.cover
          .modal__block-title.cover__left-col
            .cover__thumb(
              ref="cover"
            )
          .modal__block-control.cover__right-col
            .cover__btn
              button-round(
                text="Загрузить обложку"
                purpose="file"
                @change.native="gatherData"
              )
            .cover__desc.error(v-if="validation.hasError('newAlbum.cover')") {{validation.firstError('newAlbum.cover')}}
            .cover__desc(v-else-if="newAlbum.cover === null")
              | (файл должен быть размером менее 1.5 МБ)

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
          )  
</template>

<script lang="ts">
import SimpleVueValidator from "simple-vue-validator";
import { Validator } from "simple-vue-validator";
import Vue from "vue";
import { mixins } from "vue-class-component";
import { Component, Prop } from "vue-property-decorator";
import { Action, Mutation, namespace } from "vuex-class";
import { NewAlbum } from "../store/modules/albums/types";
import buttonRound from "./buttonRound.vue";
import inputRounded from "./inputRounded.vue";
import modalsItem from "./modalsItem.vue";

const albums = namespace("albums");
const modals = namespace("modals");

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
          ["image/jpeg", "image/png", "image/gif"].indexOf(value.type) === -1
        ) {
          return "Файл должен быть изображением (jpeg, png, gif)";
        }

        if (value.size > 1500000) {
          return "Файл весит больше чем 1.5 Мб";
        }
      });
    }
  },
  components: { inputRounded, buttonRound, modalsItem }
})
export default class ModalsAlbum extends mixins() {
  @albums.Action("createNewAlbum") public createAlbumAction: any;
  @modals.Mutation("clearModal") public closeModal!: any;

  public newAlbum: NewAlbum = {
    title: "",
    desc: "",
    cover: null
  };

  public setCoverPicture(cover: File) {
    const reader = new FileReader();

    reader.onloadend = () => {
      const coverBlock = this.$refs.cover as HTMLElement;
      coverBlock.style.backgroundImage = `url(${reader.result})`;
    };

    reader.readAsDataURL(cover);
  }

  public gatherData(e: any) {
    if (!e.target.files.length) {
      return;
    }
    const file = e.target.files[0];

    this.newAlbum.cover = file;
    this.setCoverPicture(file);
  }

  public clearFormData() {
    const coverElem = this.$refs.cover as HTMLElement;

    this.newAlbum.title = "";
    this.newAlbum.desc = "";
    this.newAlbum.cover = "";
    coverElem.style.background = "";
  }

  public async createNewAlbum() {
    const formData: any = new FormData();
    const success = await this.$validate();

    if (!success) {
      return;
    }

    Object.keys(this.newAlbum).forEach((prop) => {
      formData.append(prop, this.newAlbum[prop]);
    });

    const albumCreated = await this.createAlbumAction(formData);
    this.closeModal();
  }

  public beforeDestroy() {
    this.clearFormData();
  }
}
</script>


<style lang="pcss" scoped src="styles/modals.pcss"></style>
<style lang="pcss" scoped src="styles/modalsAlbum.pcss"></style>
