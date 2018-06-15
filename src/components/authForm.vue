<template lang="pug">
  div
    .auth-page__title
      slot(name="title")
    .auth-page__form-wrapper
      form.auth-page__form
        slot(name="inputs")
        .auth-page__form-buttons
          slot(name="buttons")
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";

@Component({
  name: "AuthForm"
})
export default class AuthForm extends Vue {}
</script>

<style lang="pcss" scoped src="styles/authForm.pcss"></style>

