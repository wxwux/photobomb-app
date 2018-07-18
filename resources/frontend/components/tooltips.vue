<template lang="pug">
  #tooltips-container.active
    .tooltip
      .tooltip__text {{message}}
      .tooltip__buttons
        button().tooltip__button Закрыть
</template>

<script lang="ts">
import Vue from "vue";
import {Component, Prop} from "vue-property-decorator";

@Component({
  name: "Tooltips"
})
export default class Tooltip extends Vue {
  @Prop({default: "Произошла ошибка!"})
  public message!: string;
}
</script>

<style lang="pcss" scoped src="styles/tooltips.pcss"></style>
