<template lang="pug">
  .user
    .user__pic
      .user__avatar
        img(src="@/img/content/avatar.jpg", alt="").user__avatar-pic
    .user__desc
      .user__name Антон Черепов
      .user__hobby Я веб разработчик. Мне 24 года. Люблю путешествия, кодинг, фриланс и активный отдых.
      .user__socials
        socials
</template>
<script>
import socials from "./socials";

export default {
  components: {
    socials
  }
};
</script>
<style src="styles/user.pcss" lang="pcss" scoped>
</style>
