<template lang="pug">
  footer.footer(
    :style="{backgroundImage: footerBg}"
  )
    .x-container.footer__container
      .footer__col.footer__desc 
        | Перед вами сервис, который поможет вам организовать свои фотографии в альбомы и поделиться ими со всем миром!
      a(href="").footer__up-btn
      .footer__col.footer__copyright
        | 2018 | Создано командой профессионалов на продвинутом курсепо веб-разработке от LoftSchool

</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";

@Component({
  name: "Footer"
})
export default class Footer extends Vue {
  public get footerBg(): string {
    const path = require("@/img/content/header-bg.jpg");
    return `url(${path})`;
  }
}

</script>

<style lang="pcss" src="styles/footer.pcss" scoped></style>
