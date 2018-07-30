<template lang="pug">
  auth-form(@submitForm="register(newUser)")
    div(slot="title")
      h1.auth-page__title-text Регистрация
    div(slot="inputs")
      iconed-input(
        icon="person",
        placeholder="Имя",
        v-model="newUser.name"
      )
      iconed-input(
        icon="mail",
        placeholder="Электронная почта"
        v-model="newUser.email"
      )
      iconed-input(
        icon="lock",
        placeholder="Пароль",
        type="password"
        v-model="newUser.password"
        autocomplete="current-password"
      )
    div(slot="buttons")
      .auth-page__remember
        | Ваши данные останутся строго конфиденциальны
      .auth-page__btns-container
        .auth-page__btns-wrap
          buttonRound(
            text="Создать аккаунт"
            :filled="true"
            type="submit"
          )
        .auth-page__btns-ps
          span Уже зарегистрированы?
          a.x-blue-link(
            @click.prevent="switchForm"
          ) Войти
</template>
<script lang="ts">
import Vue from "vue";
import { Emit } from "vue-property-decorator";
import { Component, Prop, Watch } from "vue-property-decorator";
import { Action } from "vuex-class";
import { NewUser } from "../store/modules/user/types";
import authForm from "./authForm.vue";
import buttonRound from "./buttonRound.vue";
import IconedInput from "./inputIconed.vue";

const namespace: string = "user";

@Component({
  components: { authForm, IconedInput, buttonRound },
  name: "AuthFormLogin"
})
export default class AuthFormLogin extends Vue {
  public newUser: NewUser = {
    email: "",
    name: "",
    password: ""
  };

  @Action("register", {namespace})
  public register: any;

  public switchForm(): void {
    this.$emit("switchForm", "auth-form-login");
  }
}
</script>
