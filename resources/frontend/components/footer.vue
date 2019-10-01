<template lang="pug">
  footer.footer(
    :style="{backgroundImage: footerBg}"
  )
    .x-container.footer__container
      .footer__col.footer__desc 
        | Перед вами сервис, который поможет вам организовать свои фотографии в альбомы и поделиться ими со всем миром!
      button(@click="scrollTop").footer__up-btn
      .footer__col.footer__copyright
        | 2018 | Создано командой профессионалов на продвинутом курсе по веб-разработке от LoftSchool

</template>

<script lang="ts">
import Vue from "vue";
import { Component, Prop } from "vue-property-decorator";
import { AlbumItem } from "../store/modules/albums/types";

@Component({
  name: "Footer"
})
export default class Footer extends Vue {
  @Prop({ default: () => ({}) })
  public footerData!: AlbumItem;

  @Prop()
  public coverFileName!: string;

  @Prop()
  public coverPath!: string;

  public get footerBg(): string {
    return this.coverFileName
      ? `url(${this.coverPath}/${this.coverFileName})`
      : "none";
    // const path = require("@/img/content/header-bg.jpg");
    // if (this.footerData.cover) {
    //   const path = `/uploads/albums_covers/origin/${this.footerData.cover}`;
    //   return `url(${path})`;
    // } else {
    //   return "none";
    // }
  }

  public scrollTop() {
    const header = document.querySelector(".header") as Element;
    if (header) {
      header.scrollIntoView({
        behavior: "smooth"
      });
    }
  }
}
</script>

<style lang="pcss" src="styles/footer.pcss" scoped></style>
