<template lang="pug">
  auth-form
    div(slot="title")
      h1.auth-page__title-text Регистрация
    div(slot="inputs")
      iconed-input(
        icon="person",
        placeholder="Имя"
      )
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
        | Ваши данные останутся строго конфиденциальны
      .auth-page__btns-container
        .auth-page__btns-wrap
          buttonRound(
            text="Создать аккаунт"
          )
        .auth-page__btns-ps
          span Уже зарегистрированы?
          a(href="").x-blue-link(
            @click.prevent="switchForm"
          ) Войти
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
    this.$emit("switchForm", "auth-form-login");
  }
}
</script>
