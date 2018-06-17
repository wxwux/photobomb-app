<template lang="pug">
  auth-form
    div(slot="title")
      h1.auth-page__title-text Добро пожаловать
      .auth-page__title-sub 
        p Перед вами сервис, который поможет вам организовать свои фотографии в альбомы и поделиться ими со всем миром!
    div(slot="inputs")
      iconed-input(
        icon="mail",
        placeholder="Электронная почта"
      )
      iconed-input(
        icon="lock",
        placeholder="Пароль",
        type="password"
      )
    div(slot="buttons")
      .auth-page__remember
        a(href="").x-blue-link Забыли пароль?
      .auth-page__btns-container
        .auth-page__btns-wrap
          buttonRound(
            text="Войти"
            :filled="true"
          )
        .auth-page__btns-ps
          span Нет аккаунта
          a(href="").x-blue-link(
            @click.prevent="switchForm"
          ) Зарегистрироваться  
</template>
<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import { Emit } from "vue-property-decorator";
import authForm from "./authForm.vue";
import buttonRound from "./buttonRound.vue";
import IconedInput from "./inputIconed.vue";

@Component({
  components: { authForm, IconedInput, buttonRound },
  name: "AuthFormLogin"
})
export default class AuthFormLogin extends Vue {
  public switchForm(): void {
    this.$emit("switchForm", "auth-form-register");
  }
}
</script>
