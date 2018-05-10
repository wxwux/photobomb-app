<template lang="pug">
  header.header(:style="{backgroundImage: headerBg}")
    .container
      .header__user
        user
      .header__edit-button
        slide-button(
          text="Редактировать"
          type="edit"
        )
</template>
<script>
import user from "./user";
import slideButton from "./slideButton";
export default {
  components: {
    user,
    slideButton
  },
  computed: {
    headerBg() {
      const path = require("@/img/content/header-bg.jpg");
      return `url(${path})`;
    }
  }
};
</script>
<style src="styles/header.pcss" lang="pcss" scoped>
</style>
