<template lang="pug">
  .auth-page
    .auth-page__content
      transition(name="flip" mode="out-in")
        component(
          :is="formComponent"
          @switchForm="switchForm"
        )
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import { Emit } from "vue-property-decorator";
import AuthFormLogin from "../authFormLogin.vue";
import AuthFormRegister from "../authFormRegister.vue";

@Component({
  components: { AuthFormLogin, AuthFormRegister },
  name: "AuthPage"
})
export default class Auth extends Vue {
  public formComponent: string = "auth-form-login";

  @Emit()
  public switchForm(formName: string): void {
    this.formComponent = formName;
  }
}
</script>

<style lang="pcss" src="styles/auth.pcss"></style>
