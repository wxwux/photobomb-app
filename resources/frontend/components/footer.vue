<template lang="pug">
  footer.footer(
    :style="{backgroundImage: footerBg}"
  )
    .x-container.footer__container
      .footer__col.footer__desc 
        | Перед вами сервис, который поможет вам организовать свои фотографии в альбомы и поделиться ими со всем миром!
      a(href="").footer__up-btn
      .footer__col.footer__copyright
        | 2018 | Создано командой профессионалов на продвинутом курсе по веб-разработке от LoftSchool

</template>

<script lang="ts">
import Vue from "vue";
import { Component, Prop } from "vue-property-decorator";
import { NewAlbum } from "../store/modules/albums/types";

@Component({
  name: "Footer"
})
export default class Footer extends Vue {
  @Prop({default: () => ({})})
  public footerData!: NewAlbum;

  public get footerBg(): string {
      // const path = require("@/img/content/header-bg.jpg");

    if (this.footerData.cover) {
      const path = `/uploads/albums_covers/origin/${this.footerData.cover}`;
      return `url(${path})`;
    } else {
      return "none";
    }
  }
}

</script>

<style lang="pcss" src="styles/footer.pcss" scoped></style>
