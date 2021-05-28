<template>
  <div class="container">
    <b-card-group deck>
      <div v-for="(card, index) in classCards" :key="index" :title="card.name" style="min-width: 10rem;">
        <b-img-lazy :src="card.image" v-bind="mainProps" :alt="card.name" class="zoom"></b-img-lazy>
      </div>
    </b-card-group>
  </div>
</template>

<script>
import { mapState } from 'vuex';
export default {
  name: 'Priest',
  data() {
    return {
      mainProps: {
        center: true,
        fluidGrow: false,
        blank: true,
        blankColor: '#FFF',
        width: 150,
        height: 207
      }
    };
  },
  computed: {
    ...mapState({
      cards: state => state.axiosFetch.cards
    }),
    classCards() {
      return this.cards
        .filter(card => card.classId == 6 || card.multiClassIds.includes(6))
        .sort(function(a, b) {
          return a.manaCost > b.manaCost ? 1 : -1;
        });
    }
  }
};
</script>
<style scoped>
.zoom:hover {
  transform: scale(2);
}
</style>
