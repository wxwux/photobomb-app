<template lang="pug">
  app-header
</template>

<script>
import header from "./components/header";

export default {
  name: "App",
  components: {
    appHeader: header
  },
  data() {
    return {
      msg: "Welcome to Your Vue.js App"
    };
  }
};
</script>

<style lang="scss">
</style>
