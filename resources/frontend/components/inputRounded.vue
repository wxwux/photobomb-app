<template lang="pug">
  .search-input-component(
    v-if="element === 'input'"
  )
    input(
      v-bind="$attrs"
      :type="type"
      :value="value"
      :class="{error: error && error.length}"
      @input="$emit('input', $event.target.value)"
    ).search__input
    .error-text(
      v-if="hideErrorText === false"
    ) {{error}} 

  textarea(
    v-else
    :value="value"
    v-bind="$attrs"
    :class="{error: error}"
    @input="$emit('input', $event.target.value)"
  ).search__input.search__input--textarea
</template>
<script lang="ts">
import Vue from "vue";
import { Component, Prop } from "vue-property-decorator";

@Component({
  name: "InputRounded",
  inheritAttrs: false
})
export default class Modals extends Vue {
  @Prop()
  public value!: string;

  @Prop({ default: "text" })
  public type!: string;

  @Prop({ default: "input" })
  public element!: string;

  @Prop({ default: false })
  public hideErrorText!: boolean;

  @Prop({ default: "" })
  public error!: string;
}
</script>
<style lang="pcss" src="styles/inputRounded.pcss">
</style> 