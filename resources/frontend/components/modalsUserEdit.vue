<template lang="pug">
  .modals-user-edit-component  
    modals-item(
      title="Редактировать профиль"
    ) 
      template(slot="modal-content")
        form.modal(ref="form")
          .modal__part
            .modal__row
              label.modal__block
                .modal__block-title Имя
                .modal__block-control 
                  input-rounded(
                    placeholder="Введите имя"
                    name="name"
                    v-model="userDetails.name"
                    :error="validation.firstError('userDetails.name')"
                    hideErrorText
                  )
            .modal__row
              label.modal__block
                .modal__block-title О себе
                .modal__block-control 
                  input-rounded(
                    element="textarea"
                    name="description"
                    placeholder="Расскажите о себе"
                    v-model="userDetails.description"
                    :error="validation.hasError('userDetails.description')"
                    hideErrorText
                  )
            .modals__row
              cover-loader(
                fileRestrictionText="500 КБ"
                buttonText="Загрузить фотографию"
                name="avatar"
                @onCoverUploaded="file => userDetails.avatar = file"
                :errorText="validation.hasError('userDetails.avatar')"
              )
            .modals__row
              cover-loader(
                fileRestrictionText="1.5 МБ"
                buttonText="Загрузить фон"
                name="background"
                @onCoverUploaded="file => userDetails.background = file"
                :errorText="validation.hasError('userDetails.background')"
              )

          .modal__part.modal__socials
            .modal__row
              label.modal__block
                .modal__block-title Вконтакте
                .modal__block-control 
                  input-rounded(
                    name="vk"
                    placeholder="http://vk.com/"
                    v-model="userDetails.socials.vk"
                    :error="validation.hasError('userDetails.socials.vk')"
                  )
            .modal__row
              label.modal__block
                .modal__block-title Facebook
                .modal__block-control 
                  input-rounded(
                    name="fb"
                    placeholder="http://facebook.com/"
                    v-model="userDetails.socials.fb"
                    :error="validation.hasError('userDetails.socials.fb')"
                  )
            .modal__row
              label.modal__block
                .modal__block-title Email
                .modal__block-control 
                  input-rounded(
                    name="email"
                    placeholder="name@domain.com"
                    v-model="userDetails.socials.email"
                    :error="validation.hasError('userDetails.socials.email')"
                  )
            .modal__row
              label.modal__block
                .modal__block-title Twitter
                .modal__block-control 
                  input-rounded(
                    name="tw"
                    placeholder="http://twitter.com/"
                    v-model="userDetails.socials.tw"
                    :error="validation.hasError('userDetails.socials.tw')"
                  )
      template(slot="modal-buttons")
        .modal__buttons-common
          .modal__buttons-elem
            button-round(
              text="Сохранить"
              :filled="true"
              :disabled="!!validation.allErrors().length"
              @click="saveProfile"
            )
          .modal__buttons-elem
            button-round(
              text="Отменить"
              bgClass="transparent"
            )
</template>

<script lang="ts">
import Vue from "vue";
import { Component } from "vue-property-decorator";
import modalsItem from "./modalsItem.vue";
import inputRounded from "./inputRounded.vue";
import coverLoader from "./coverLoader.vue";
import { namespace } from "vuex-class";
import buttonRound from "./buttonRound.vue";
import { mixins } from "vue-class-component";
import { UserDetails } from "../store/modules/user/types";
import { BindingHelpers } from "vuex-class/lib/bindings";
import SimpleVueValidator, { Validator } from "simple-vue-validator";

const user: BindingHelpers = namespace("user");

@Component({
  name: "ModalsUserEdit",
  components: {
    modalsItem,
    inputRounded,
    coverLoader,
    buttonRound
  },
  validators: {
    "userDetails.name"(value) {
      return Validator.value(value).required("Имя не может быть пустым");
    },
    "userDetails.description"(value) {
      return Validator.value(value).required("Заполните описание");
    },
    "userDetails.avatar"(value) {
      return Validator.custom(() => {
        if (
          ["image/jpeg", "image/png", "image/jpg"].indexOf(value.type) === -1
        ) {
          return "Файл должен быть изображением (jpg, png)";
        }

        if (value.size > 500000) {
          return "Файл весит больше чем 500 КБ";
        }
      });
    },
    "userDetails.background"(value) {
      return Validator.custom(() => {
        if (
          ["image/jpeg", "image/png", "image/jpg"].indexOf(value.type) === -1
        ) {
          return "Файл должен быть изображением (jpg, png)";
        }

        if (value.size > 1500000) {
          return "Файл весит больше чем 1.5 МБ";
        }
      });
    },
    "userDetails.socials.vk"(value) {
      return Validator.value(value).url("Должен быть валидным url");
    },
    "userDetails.socials.fb"(value) {
      return Validator.value(value).url("Должен быть валидным url");
    },
    "userDetails.socials.tw"(value) {
      return Validator.value(value).url("Должен быть валидным url");
    },
    "userDetails.socials.email"(value) {
      return Validator.value(value).email("Должен быть валидным email");
    }
  }
})
export default class ModalsUserEdit extends mixins() {
  public userDetails: UserDetails = {
    name: "",
    description: "",
    avatar: {},
    background: {},
    socials: {
      vk: "",
      fb: "",
      email: "",
      tw: ""
    }
  };

  @user.Action("updateProfile")
  public updateProfile;

  public saveProfile() {
    const form: HTMLFormElement = this.$refs.form as HTMLFormElement;
    const data: FormData = new FormData(form);

    this.updateProfile(data);
  }
}
</script>


<style lang="pcss" scoped src="styles/modals.pcss"></style>