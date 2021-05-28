<template>
  <div class="container">
    <p>LOL</p>
    <div class="container">
      <h1>{{ hero.name }}</h1>
      <h4>Deck code: {{ deckCode }}</h4>
      <h4>format {{ format }}</h4>
      <ol>
        <li v-for="(card, index) in sortFunc()" :key="index">
          <img :src="card.image" :alt="card.name" height="100" width="80" class="zoom" />
          <p>{{ card.name }}</p>
        </li>
      </ol>
    </div>
  </div>
</template>
<script>
import axios from 'axios';

export default {
  name: 'About',
  data() {
    return {
      cards: [],
      deckCode: '',
      hero: {},
      format: ''
    };
  },
  beforeCreate() {
    const token = this.$store.state.oauth.accessToken;
    const code = 'AAECAf0EFk1xyQOrBO0Eg5YDn5sDoJsD/50DwqEDv6QD9KsD7K8DjLYDwbgDgb8D4MwD+90D694Dv+ADkeEDk+EDBPGvA4y5A97EA83OAwA=';
    axios
      .get(`https://eu.api.blizzard.com/hearthstone/deck?locale=en_US&code=${code}&access_token=${token}`)
      .then(res => {
        console.log(res.data);
        this.cards = res.data.cards;
        this.deckCode = res.data.deckCode;
        this.hero = res.data.hero;
        this.format = res.data.format;
      })
      .catch(e => {
        console.log(e.message);
      });
  },
  methods: {
    sortFunc: function() {
      return this.cards.slice().sort(function(a, b) {
        return a.manaCost > b.manaCost ? 1 : -1;
      });
    }
  }
};
</script>
<style scoped>
.zoom:hover {
  transform: scale(3);
}
</style>
