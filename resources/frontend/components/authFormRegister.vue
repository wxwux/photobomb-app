<template lang="pug">
  auth-form(@submitForm="register")
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
import Component from "vue-class-component";
import { Emit } from "vue-property-decorator";
import authForm from "./authForm.vue";
import buttonRound from "./buttonRound.vue";
import IconedInput from "./inputIconed.vue";

interface User {
  name: string;
  password: string;
  email: string;
}

@Component({
  components: { authForm, IconedInput, buttonRound },
  name: "AuthFormLogin"
})
export default class AuthFormLogin extends Vue {
  public newUser: User = {
    email: "",
    name: "",
    password: ""
  };

  public switchForm(): void {
    this.$emit("switchForm", "auth-form-login");
  }

  public register(): void {
    this.$http.post("/register", this.newUser).then((response) => {
      console.log(response);
    }).catch((e) => console.error(e));
  }
}
</script>
