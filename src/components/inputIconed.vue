<template lang="pug">
  input(
    :type="type"
    :placeholder="placeholder"
    :class="icon.length > 0 ? `iconed-input--${icon}` : '' "
  ).iconed-input
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import {Prop} from "vue-property-decorator";

@Component({
  name: "IconedInput"
})
export default class IconedInput extends Vue {
  @Prop({default: "Введите данные"})
  public placeholder!: string;

  @Prop({default: "lock"})
  public icon!: string;

  @Prop({default: "text"})
  public type!: string;

}
</script>
<style lang="pcss" src="styles/inputIconed.pcss" scoped></style>
