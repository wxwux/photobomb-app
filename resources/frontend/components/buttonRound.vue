<template lang="pug">
  button(
    v-if="purpose ==='button'"
    v-bind="$attrs"
    :type="type"
    :class="[`round-btn--bg_${bgClass}`, `round-btn--icon_${icon}`, buttonClasses]"
    v-on="$listeners"
  ).round-btn 
    span.round-btn__text {{text}}

  label(v-else-if="purpose === 'file'")#round-file-input
    .round-btn {{text}}
    input(
      v-bind="$attrs"
      v-on="$listeners"
      type="file"
      accept="image/jpeg,image/png,image/jpg"
    ).round-btn__file
</template>
<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import { Prop } from "vue-property-decorator";

@Component({
  name: "buttonRound",
  inheritAttrs: false
})
export default class RoundButton extends Vue {
  @Prop({ default: "Загрузить" })
  public text!: string;

  @Prop({ default: false })
  public filled!: boolean;

  @Prop({ default: "button" })
  public type!: string;

  @Prop({ default: "button" })
  public purpose!: string;

  @Prop({ default: "blue" })
  public bgClass!: string;

  @Prop({ default: "" })
  public icon!: string;

  @Prop({ default: false })
  public blocked!: boolean;

  get buttonClasses() {
    return {
      "round-btn--filled": this.filled,
      "round-btn--iconed": Boolean(this.icon.length),
      "blocked": this.blocked
    };
  }
}
</script>

<style lang="pcss" scoped src="styles/buttonRound.pcss"></style>

