<template lang="pug">
  div
    .auth-page__title
      slot(name="title")
    .auth-page__form-wrapper
      form.auth-page__form(
        autocomplete="on"
        @submit.prevent="handleSubmit"
      )
        slot(name="inputs")
        .auth-page__form-buttons
          slot(name="buttons")
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import { Emit } from "vue-property-decorator";

@Component({
  name: "AuthForm"
})
export default class AuthForm extends Vue {
  public handleSubmit(): void {
    this.$emit("submitForm");
  }
}
</script>

<style lang="pcss" scoped src="styles/authForm.pcss"></style>

