<template lang="pug">
  ul.socials__list
    li.socials__item(v-for="social in socials")
      a(href="").socials__link
        img(
          :src="getImagePath(social.icon)"
          :alt="`icon from ${social.name} social`"
        ).socials__pic
</template>

<script>
export default {
  data() {
    return {
      socials: [
        { name: "vk", icon: "soc_vk.svg" },
        { name: "tw", icon: "soc_twitter.svg" },
        { name: "fb", icon: "soc_fb.svg" },
        { name: "gp", icon: "social_google.svg" },
        { name: "mail", icon: "soc_email.svg" }
      ]
    };
  },
  methods: {
    getImagePath(icon) {
      const context = require.context('@/img/icons');
      return context(`./${icon}`);
    }
  }
};
</script>

<style lang="scss" scoped src="styles/socials.scss"></style>

