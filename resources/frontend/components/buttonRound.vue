<template lang="pug">
  button(
    v-if="purpose ==='button'"
    v-bind="$attrs"
    :type="type"
    :class="[{'round-btn--filled': filled }, `round-btn--bg_${bgClass}`, {'round-btn--iconed': icon.length}, `round-btn--icon_${icon}`]"
    v-on="$listeners"
  ).round-btn {{text}}

  label(v-else-if="purpose === 'file'")#round-file-input
    .round-btn {{text}}
    input(
      v-bind="$attrs"
      v-on="$listeners"
      type="file"
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
  @Prop({default: "Загрузить"})
  public text!: string;

  @Prop({default: false})
  public filled!: boolean;

  @Prop({default: "button"})
  public type!: string;

  @Prop({default: "button"})
  public purpose!: string;

  @Prop({default: "blue"})
  public bgClass!: string;

  @Prop({default: ""})
  public icon!: string;

  public mounted() {
    // console.log("listen", this.$listeners);
  }
}
</script>

<style lang="pcss" scoped src="styles/buttonRound.pcss"></style>

