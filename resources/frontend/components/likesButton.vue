<template lang="pug">
  button(
    type="text"
    :class="{'liked' : liked, 'blocked' : blocked}"
    @click="handleClick"
  ).like-btn-component {{amount}}
    
</template>

<script lang="ts">
import Vue from "vue";
import { Component, Prop } from "vue-property-decorator";

@Component({
  name: "LikesButton"
})
export default class LikesButton extends Vue {
  @Prop({ default: 0 })
  public amount!: number;

  @Prop({ default: false })
  public liked!: boolean;

  @Prop({ default: false })
  public blocked!: boolean;

  public handleClick() {
    if (this.liked === false) {
      this.$emit("onLike");
    } else {
      this.$emit("onDislike");
    }
  }
}
</script>


<style lang="pcss" scoped src="styles/likesButton.pcss"></style>

