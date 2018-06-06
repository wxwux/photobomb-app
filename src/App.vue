<template lang="pug">
  .root
    .root__header
      app-header
    main.root__content
      main-page
</template>
<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import header from "./components/header.vue";
import mainPage from "./components/pages/main.vue";

@Component({
  components: {
    appHeader: header,
    mainPage
  },
  name: "RootApp",
})
export default class App extends Vue {
}
</script>

<style lang="pcss" scoped>
  .root__header {
    margin-bottom: 40px;
  }
</style>
