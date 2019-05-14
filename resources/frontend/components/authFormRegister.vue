<template lang="pug">
  auth-form(@submitForm="registerNewUser(newUser)")
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
import { Action, Mutation } from "vuex-class";
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

  @Action("register", { namespace })
  public register: any;

  @Mutation("showAlerts", { namespace: "alerts" })
  public showAlerts: any;

  public switchForm(): void {
    this.$emit("switchForm", "auth-form-login");
  }

  public async registerNewUser(userData: NewUser): Promise<any> {
    try {
      const response = await this.register(userData);

      this.showAlerts({
        type: "warning",
        messages: ["Регистрация прошла успешно"]
      });

      this.newUser.name = "";
      this.newUser.email = "";
      this.newUser.password = "";

      this.switchForm();
    } catch (error) {
      const errors = error.response.data.errors;
      const errorMessages = Object.keys(errors).map((field) => errors[field][0]);

      this.showAlerts({
        type: "error",
        messages: [errorMessages[0]]
      });
    }
  }
}
</script>
