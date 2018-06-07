<template lang="pug">
  ul.cards-list(:class="`cards-list--row-by-${itemsInRow}`")
    li.cards-list__item(v-for="n in 6")
      slot(:item="n")
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import { Prop } from "vue-property-decorator";

@Component({
  name: "CardList"
})
export default class CardList extends Vue {
  @Prop({default: 3})
  public itemsInRow!: number;
}
</script>

<style lang="pcss" src="styles/cardList.pcss" scoped></style>
