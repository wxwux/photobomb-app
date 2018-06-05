<template lang="pug">
  ul.socials__list
    li.socials__item(v-for="social in socials")
      a(href="").socials__link
        img(
          :src="getImagePath(social.icon)"
          :alt="`icon from ${social.name} social`"
        ).socials__pic
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
declare const require: any;

interface Icon {
  name: string;
  icon: string;
}

@Component({
  name: "Socials"
})
export default class Socials extends Vue {
  private socials: Icon[] = [
    { name: "vk", icon: "soc_vk.svg" },
    { name: "tw", icon: "soc_twitter.svg" },
    { name: "fb", icon: "soc_fb.svg" },
    { name: "gp", icon: "social_google.svg" },
    { name: "mail", icon: "soc_email.svg" },
  ];

  private getImagePath(icon: string): string {
    const context = require.context("@/img/icons");
    return context(`./${icon}`);
  }
}
</script>

<style lang="pcss" scoped src="styles/socials.pcss">
</style>
