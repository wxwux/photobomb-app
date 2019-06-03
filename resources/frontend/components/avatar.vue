<template lang="pug">
  .avatar-component 
    img(
      :src="userAvatar"
    ).avatar__image
</template>

<script lang="ts">
import Vue from "vue";
import { Component, Prop } from "vue-property-decorator";

@Component({
  name: "Avatar"
})
export default class Avatar extends Vue {
  @Prop()
  public avatar!: string;

  get userAvatar(): string {
    const defaultAvatar = require("@/img/defaults/avatar.png");
    return this.avatar ? `/uploads/user/${this.avatar}` : defaultAvatar;
  }
}
</script>

<style lang="postcss" scoped src="styles/avatar.pcss"></style>
