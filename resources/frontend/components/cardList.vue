<template lang="pug">
  ul.cards-list(:class="`cards-list--row-by-${itemsInRow}`")
    li.cards-list__item(v-for="item in items")
      slot(:item="item")
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

  @Prop()
  public items!: object[];
}
</script>

<style lang="pcss" src="styles/cardList.pcss" scoped></style>
