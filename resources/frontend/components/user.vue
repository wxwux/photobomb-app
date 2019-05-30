<template lang="pug">
  .user(:class="{user__minimized : minimize}")
    template(v-if="minimize === false")
      .user__pic
        .user__avatar
          img(:src="`uploads/user/${user.avatar}`", alt="").user__avatar-pic
      .user__desc
        .user__name {{user.name}}
        .user__hobby {{user.description}}
        .user__socials
          socials
    
    template(v-else)
      .user__pic
        .user__avatar
          img(src="@/img/content/avatar.jpg", alt="").user__avatar-pic
      .user__desc
        .user__name {{user.name}}
</template>
<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import { Prop } from "vue-property-decorator";
import socials from "./socials.vue";
import { namespace } from "vuex-class";
import { BindingHelpers } from "vuex-class/lib/bindings";
import { UserState, UserDetails } from "../store/modules/user/types";

const user: BindingHelpers = namespace("user");

@Component({
  components: {
    socials
  },
  name: "User"
})
export default class User extends Vue {
  @Prop({ default: false })
  public minimize!: boolean;

  @user.State(( state: UserState ) => state.userDetails)
  public user!: UserDetails;
}
</script>
<style src="styles/user.pcss" lang="pcss" scoped>
</style>
