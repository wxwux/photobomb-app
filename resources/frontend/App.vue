<template lang="pug">
  .root
    router-view
</template>
<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import auth from "./components/pages/auth.vue";
import mainPage from "./components/pages/main.vue";

@Component({
  components: {
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
