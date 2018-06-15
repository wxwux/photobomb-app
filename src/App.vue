<template lang="pug">
  .root
    auth
    // .root__header
    //   app-header
    // main.root__content
    //   main-page
    // .root__footer
    //   app-footer
</template>
<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import footer from "./components/footer.vue";
import header from "./components/header.vue";
import auth from "./components/pages/auth.vue";
import mainPage from "./components/pages/main.vue";

@Component({
  components: {
    appFooter: footer,
    appHeader: header,
    auth,
    mainPage,
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
