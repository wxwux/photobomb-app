<template lang="pug">
  button(
    :type="type"
    :class="{'round-btn--filled': filled }"
    v-on="$listeners"
  ).round-btn {{text}}
</template>
<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import { Prop } from "vue-property-decorator";

@Component({
  name: "buttonRound"
})
export default class RoundButton extends Vue {
  @Prop({default: "Загрузить"})
  public text!: string;

  @Prop({default: false})
  public filled!: boolean;

  @Prop({default: "button"})
  public type!: string;
}
</script>

<style lang="pcss" scoped src="styles/buttonRound.pcss"></style>

