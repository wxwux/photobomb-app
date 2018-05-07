<template lang="pug">
  button(
  ).slide-button
    .slide-button__content
      .slide-button__icon(
        :class="`slide-button__icon--${icon}`"
      )
      .slide-button__text {{text}}
</template>
<script>
const icons = ["edit"];
export default {
  props: {
    icon: {
      type: String,
      default: "edit",
      validator(value) {
        return icons.indexOf(value) !== -1;
      }
    },
    text: {
      type: String,
      default: "Button"
    }
  }
};
</script>
<style src="styles/slideButton.scss" lang="scss" scoped>
</style>
