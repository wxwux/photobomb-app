<template lang="pug">
  .root
    app-header
</template>
<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import header from "./components/header.vue";

@Component({
  components: {
    appHeader: header,
  },
  name: "RootApp",
})
export default class App extends Vue {
  public message: string = "Hello World";

  public mounted() {
    console.log("adasd");
  }
}
</script>
