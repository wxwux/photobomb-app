<template lang="pug">
  .card-photo(v-if="view === 'full'")
    .card-photo__picture(
      style="background-image: url('https://picsum.photos/400/400')"
    )
    .card-photo__user-info
      .card-photo__pics
        .card-photo__avatar
          img(
            src="https://picsum.photos/100/100", alt=""
          ).card-photo__avatar-pic
      .card-photo__data
        h3.card-photo__title Путешествие на лодке по озеру
        .card-photo__social
          likes-and-comments
    .card-photo__photo-info
      .card-photo__album-name Прогулки по воде

  .card-photo.card-photo_simple-view(v-else-if="view === 'simple'")
    .card-photo__picture-wrap
      .card-photo__picture(
        style="background-image: url('https://picsum.photos/400/400')"
      )
      .card-photo__onpicture-data
        likes-and-comments
    .card-photo__user-info
      card-edit-line(title="Путешествие на лодке по озеру")
</template>
<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import { Prop } from "vue-property-decorator";
import CardEditLine from "./card-edit-line.vue";
import likesAndComments from "./likesAndComments.vue";

@Component({
  components: { likesAndComments, CardEditLine },
  name: "CardPhoto"
})
export default class CardPhoto extends Vue {
  @Prop({ default: "full" })
  public view!: string;
}
</script>
<style src="styles/cardPhoto.pcss" lang="scss" scoped></style>