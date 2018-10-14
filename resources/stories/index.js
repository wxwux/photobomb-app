import Vue from "vue";

import { storiesOf } from "@storybook/vue";

import likes from "../frontend/components/likesAndComments.vue";

storiesOf("buttonRound", module).add("story as a component", () => ({
  components: { 
    likes
   },
  template: "<div> <likes></likes> </div>"
}));
