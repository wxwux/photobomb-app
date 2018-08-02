<template lang="pug">
  .user(:class="{user__minimized : minimize}")
    template(v-if="minimize === false")
      .user__pic
        .user__avatar
          img(src="@/img/content/avatar.jpg", alt="").user__avatar-pic
      .user__desc
        .user__name Антон Черепов
        .user__hobby Я веб разработчик. Мне 24 года. Люблю путешествия, кодинг, фриланс и активный отдых.
        .user__socials
          socials
    
    template(v-else)
      .user__pic
        .user__avatar
          img(src="@/img/content/avatar.jpg", alt="").user__avatar-pic
      .user__desc
        .user__name Антон Черепов
</template>
<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import { Prop } from "vue-property-decorator";
import socials from "./socials.vue";

@Component({
  components: {
    socials
  },
  name: "User"
})
export default class User extends Vue {
  @Prop({default: false})
  public minimize!: boolean;
}
</script>
<style src="styles/user.pcss" lang="pcss" scoped>
</style>
