<template lang="pug">
  input(
    v-if="element === 'input'"
    :type="type"
    :placeholder="placeholder"
  ).search__input
  textarea(
    v-else
    :placeholder="placeholder"
  ).search__input.search__input--textarea
</template>
<script lang="ts">
import Vue from "vue";
import { Component, Prop } from "vue-property-decorator";

@Component({
  name: "InputRounded"
})
export default class Modals extends Vue {
  @Prop({ default: "text" })
  public type!: string;

  @Prop({ default: "Введите данные" })
  public placeholder!: string;

  @Prop({ default: "input" })
  public element!: string;
}
</script>
<style lang="pcss" src="styles/inputRounded.pcss">
</style> 