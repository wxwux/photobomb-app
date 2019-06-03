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
    //- .header__search
    //-   .header__bar
    //-     .x-container.header__bar-container
    //-       slot(name="header-bottom")

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
import { UserState, UserDetails } from "../store/modules/user/types";

const modals: BindingHelpers = namespace("modals");
const userModule: BindingHelpers = namespace("user");

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

  @Prop()
  public coverFileName!: string;

  @Prop()
  public coverPath!: string;

  @userModule.State((state: UserState) => state.userDetails)
  public userDetails!: UserDetails;

  @modals.Mutation("showModal")
  public showModal;

  public get headerBg(): string {
    return this.coverFileName
      ? `url(${this.coverPath}/${this.coverFileName})`
      : "none";
    // let cover: string = "";
    // if (this.view === "user-view") {
    //   const bgFilename = this.userDetails.background;
    //   cover = `url(/uploads/user/origin/${bgFilename})`;
    // } else {
    //   if (this.headerData.cover) {
    //     const path = `/uploads/albums_covers/origin/${this.headerData.cover}`;
    //     cover = `url(${path})`;
    //   } else {
    //     cover = "none";
    //   }
    // }
    // return cover;
  }
}
</script>
<style src="styles/header.pcss" lang="pcss" scoped>
</style>
