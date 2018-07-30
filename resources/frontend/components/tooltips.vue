<template lang="pug">
  #tooltips-container(:class="{active: showAlerts}")
    .tooltip
      .tooltip__text
        .tooltip__message(
          v-for="item in alerts.messages"
        ) {{item}}
      .tooltip__buttons
        button(@click="showAlerts = false").tooltip__button Закрыть
</template>

<script lang="ts">
import Vue from "vue";
import { Component, Prop, Watch } from "vue-property-decorator";
import { State } from "vuex-class";
import { AlertsState } from "../store/modules/alerts/types";

const namespace: string = "alerts";

let timer: number | undefined;

@Component({
  name: "Tooltips"
})
export default class Tooltip extends Vue {
  public showAlerts: boolean = false;

  @State("data", { namespace })
  public alerts!: AlertsState;

  @Watch("alerts")
  public showAlertsBox() {
    this.showAlerts = true;

    if (typeof timer !== "undefined") { clearTimeout(timer); }

    timer = setTimeout(() => {
      this.showAlerts = false;
    }, 3000);
  }

}
</script>

<style lang="pcss" scoped src="styles/tooltips.pcss"></style>
