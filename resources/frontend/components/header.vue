<template lang="pug">
  header.header(:style="{backgroundImage: headerBg}" :class="`header--${view}`")
    .x-container.header__container
      template(v-if="view === 'user-view'")
        .header__user
          user
        .header__edit-button
          slide-button(
            text="Редактировать"
            type="edit"
            @click="showModal('user-edit')"
          )

      template(v-if="view === 'album-view'")
        .header__top-info
          user(
            :minimize="true"
          )
        .header__content
          h1.header__content-title {{headerData.title}}
          .header__contetn-text
            p {{headerData.desc}}
        .header__edit-button
          .header__edit-button-row
            slide-button(
              text="На главную"
              icon="home"
              @click.native="$router.push('/')"
            )
          .header__edit-button-row
            slide-button(
              text="Редактировать"
              icon="edit"
            )
    .header__search
      .header__bar
        .x-container.header__bar-container
          slot(name="header-bottom")

</template>
<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import { Prop } from "vue-property-decorator";
import { AlbumItem } from "../store/modules/albums/types";
import slideButton from "./buttonSlide.vue";
import user from "./user.vue";

import { namespace } from "vuex-class";
import { BindingHelpers } from "vuex-class/lib/bindings";

const modals: BindingHelpers = namespace("modals");

@Component({
  components: {
    slideButton,
    user
  },
  name: "Header"
})
export default class Header extends Vue {
  @Prop({ default: "user-view" })
  public view!: string;

  @Prop({ default: () => ({}) })
  public headerData!: any;

  @modals.Mutation("showModal")
  public showModal;

  public get headerBg(): string {
    console.log("data", this.headerData.cover);

    if (this.headerData.cover) {
      const path = `/uploads/albums_covers/origin/${this.headerData.cover}`;
      return `url(${path})`;
    } else {
      return "none";
    }
  }
}
</script>
<style src="styles/header.pcss" lang="pcss" scoped>
</style>
