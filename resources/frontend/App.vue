<template lang="pug">
  .root
    router-view
    .alert-tooltip
    tooltips
    
</template>
<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import auth from "./components/pages/auth.vue";
import mainPage from "./components/pages/main.vue";
import tooltips from "./components/tooltips.vue";

@Component({
  components: {
    auth,
    mainPage,
    tooltips
  },
  name: "RootApp",
})
export default class App extends Vue {
}
</script>

<style lang="pcss" scoped>
  .root {
    height: 100%;
  }
  .root__header {
    margin-bottom: 40px;
  }
</style>
