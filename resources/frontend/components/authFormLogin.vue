<template lang="pug">
  auth-form(@submitForm="login")
    div(slot="title")
      h1.auth-page__title-text Добро пожаловать
      .auth-page__title-sub 
        p Перед вами сервис, который поможет вам организовать свои фотографии в альбомы и поделиться ими со всем миром!
    div(slot="inputs")
      iconed-input(
        icon="mail",
        placeholder="Электронная почта"
        v-model="existedUser.email"
        autocomplete="username"
      )
      iconed-input(
        icon="lock",
        placeholder="Пароль",
        type="password"
        v-model="existedUser.password"
        autocomplete="current-password"
      )
    div(slot="buttons")
      .auth-page__remember
        a(href="").x-blue-link Забыли пароль?
      .auth-page__btns-container
        .auth-page__btns-wrap
          buttonRound(
            text="Войти"
            type="submit"
            :filled="true"
          )
        .auth-page__btns-ps
          span Нет аккаунта
          a.x-blue-link(
            @click.prevent="$emit('switchForm', 'auth-form-register')"
          ) Зарегистрироваться  
</template>
<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import { Emit } from "vue-property-decorator";
import { Action } from "vuex-class";
import { setupToken } from "../helpers/jwt";
import { UserState } from "../store/modules/user/types";
import authForm from "./authForm.vue";
import buttonRound from "./buttonRound.vue";
import IconedInput from "./inputIconed.vue";

const namespace: string = "user";

interface User {
  email: string;
  password: string;
}

@Component({
  components: { authForm, IconedInput, buttonRound },
  name: "AuthFormLogin"
})
export default class AuthFormLogin extends Vue {
  @Action("login", { namespace })
  public login: any;

  public existedUser: User = {
    email: "",
    password: ""
  };
}
</script>
