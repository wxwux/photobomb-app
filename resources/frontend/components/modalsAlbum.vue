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
              )
        .modal__row
          label.modal__block
            .modal__block-title Описание
            .modal__block-control 
              input-rounded(
                element="textarea"
                v-model="newAlbum.desc"
              )
        .modal__row.cover
          .modal__block-title.cover__left-col
            .cover__thumb
          .modal__block-control.cover__right-col
            .cover__btn
              button-round(
                text="Загрузить обложку"
                purpose="file"
                @change.native="gatherData"
              )
            .cover__desc
              | (файл должен быть размером не более 1024 КБ)
      template(slot="modal-buttons")
        .modal__buttons-common
          .modal__buttons-elem
            button-round(
              text="Сохранить"
              :filled="true"
              @click="createNewAlbum"
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
import { Action } from "vuex-class";
import { NewAlbum } from "../store/modules/albums/types";
import buttonRound from "./buttonRound.vue";
import inputRounded from "./inputRounded.vue";
import modalsItem from "./modalsItem.vue";

const namespace: string = "albums";

@Component({
  name: "ModalsAlbum",
  components: { inputRounded, buttonRound, modalsItem }
})
export default class ModalsAlbum extends Vue {
  @Action("createNewAlbum", { namespace })
  public createAlbumAction: any;

  public newAlbum: NewAlbum = {
    title: "",
    desc: "",
    cover: null
  };

  public gatherData(e: any) {
    if (!e.target.files.length) {
      return;
    }
    this.newAlbum.cover = e.target.files[0];
  }

  public createNewAlbum() {
    const formData: any = new FormData();

    Object.keys(this.newAlbum).forEach((prop) => {
      formData.append(prop, this.newAlbum[prop]);
    });

    this.createAlbumAction(formData);

  }
}
</script>


<style lang="pcss" scoped src="styles/modals.pcss"></style>
<style lang="pcss" scoped src="styles/modalsAlbum.pcss"></style>
