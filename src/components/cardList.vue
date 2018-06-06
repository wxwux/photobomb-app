<template lang="pug">
  ul.cards-list
    li.cards-list__item(v-for="n in 6")
      slot(:item="n")
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";

@Component({
  name: "CardList"
})
export default class CardList extends Vue {}
</script>

<style lang="pcss" src="styles/cardList.pcss" scoped></style>
