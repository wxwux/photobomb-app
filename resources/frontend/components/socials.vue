<template lang="pug">
  ul.socials__list
    li.socials__item(
      v-for="social in socials"
      v-if="user.socials[social.name]"
    )
      a(href="").socials__link
        img(
          :src="getImagePath(social.icon)"
          :alt="`icon from ${social.name} social`"
        ).socials__pic
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import { namespace } from "vuex-class";
import { BindingHelpers } from "vuex-class/lib/bindings";
import { UserState, UserDetails } from "../store/modules/user/types";

const user: BindingHelpers = namespace("user");

interface Icon {
  name: string;
  icon: string;
}

@Component({
  name: "Socials"
})
export default class Socials extends Vue {

  @user.State((state: UserState) => state.userDetails)
  public user!: UserDetails;

  private socials: Icon[] = [
    { name: "vk", icon: "soc_vk.svg" },
    { name: "tw", icon: "soc_twitter.svg" },
    { name: "fb", icon: "soc_fb.svg" },
    { name: "email", icon: "soc_email.svg" }
  ];

  private getImagePath(icon: string): string {
    const context = require.context("@/img/icons");
    return context(`./${icon}`);
  }
}
</script>

<style lang="pcss" scoped src="styles/socials.pcss">
</style>
