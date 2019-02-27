<template lang="pug">
  auth-form(@submitForm="enter(user)")
    div(slot="title")
      h1.auth-page__title-text Добро пожаловать
      .auth-page__title-sub 
        p Перед вами сервис, который поможет вам организовать свои фотографии в альбомы и поделиться ими со всем миром!
    div(slot="inputs")
      iconed-input(
        icon="mail",
        placeholder="Электронная почта"
        v-model="user.email"
        autocomplete="username"
      )
      iconed-input(
        icon="lock",
        placeholder="Пароль",
        type="password"
        v-model="user.password"
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
import { Action, Mutation } from "vuex-class";
import { setupToken } from "../helpers/jwt";
import { User, UserState } from "../store/modules/user/types";
import authForm from "./authForm.vue";
import buttonRound from "./buttonRound.vue";
import IconedInput from "./inputIconed.vue";

const namespace: string = "user";

@Component({
  components: { authForm, IconedInput, buttonRound },
  name: "AuthFormLogin"
})
export default class AuthFormLogin extends Vue {
  @Action("login", { namespace })
  public login: any;

  @Mutation("showAlerts", { namespace: "alerts" })
  public showAlerts: any;

  public user: User = {
    email: "",
    password: ""
  };

  async enter(user: User) {
    try {
      await this.login(user);

      this.$router.replace('/');
    } catch (error) {
      this.showAlerts({
        type: "warning",
        messages: [error.message]
      });
    }
  }
}
</script>
