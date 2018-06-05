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
    .header__search
      search
</template>
<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import search from "./search.vue";
import slideButton from "./slideButton.vue";
import user from "./user.vue";
declare const require: any;

@Component({
  components: {
    search,
    slideButton,
    user
  },
  name: "Header"
})
export default class Header extends Vue {
  public get headerBg(): string {
    const path = require("@/img/content/header-bg.jpg");
    return `url(${path})`;
  }
}
</script>
<style src="styles/header.pcss" lang="pcss" scoped>
</style>
