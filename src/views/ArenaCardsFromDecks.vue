<template>
  <div class="container">
    <h3>Total Number of Cards: {{ numberOfCards }}</h3>
    <b-input-group>
      <b-button size="lg" switch v-for="(hero, idx) in heroes" :key="idx" :pressed.sync="hero.state" @click="bake(hero.id)" class="bake">
        <span> {{ hero.text }} </span>
      </b-button>
      <b-button @click="multiFilter">Apply</b-button>
    </b-input-group>

    <b-input-group :append="filters.manaCost" class="mt-3">
      <b-form-input v-model="filters.manaCost" type="range" min="0" max="12"></b-form-input>
    </b-input-group>
    <div v-if="ok">
      <p>trololo</p>
      <b-img-lazy v-for="card in trololo" :key="card.id" :src="card.image" width="181" height="250"></b-img-lazy>
    </div>
    <div>
      <b-img-lazy v-for="card in new_cards" :key="card.id" :src="card.image" width="181" height="250"></b-img-lazy>
    </div>
    <!-- <div v-if="heroes[0].state">
      <p>{{ heroes[0].text }} : {{ hunter_cards.length }}</p>
      <b-img-lazy v-for="card in hunter_cards" :key="card.id" :src="card.image" width="181" height="250"></b-img-lazy>
    </div>

    <div v-if="heroes[1].state">
      <p>{{ heroes[1].text }} : {{ mage_cards.length }}</p>
      <b-img-lazy v-for="card in mage_cards" :key="card.id" :src="card.image" width="181" height="250"></b-img-lazy>
    </div>

    <div v-if="heroes[2].state">
      <p>{{ heroes[2].text }} : {{ warrior_cards.length }}</p>
      <b-img-lazy v-for="card in warrior_cards" :key="card.id" :src="card.image" width="181" height="250"></b-img-lazy>
    </div>

    <div v-if="heroes[3].state">
      <p>{{ heroes[3].text }} : {{ druid_cards.length }}</p>
      <b-img-lazy v-for="card in druid_cards" :key="card.id" :src="card.image" width="181" height="250"></b-img-lazy>
    </div>

    <div v-if="heroes[4].state">
      <p>{{ heroes[4].text }} : {{ rogue_cards.length }}</p>
      <b-img-lazy v-for="card in rogue_cards" :key="card.id" :src="card.image" width="181" height="250"></b-img-lazy>
    </div>

    <div v-if="heroes[5].state">
      <p>{{ heroes[5].text }} : {{ shaman_cards.length }}</p>
      <b-img-lazy v-for="card in shaman_cards" :key="card.id" :src="card.image" width="181" height="250"></b-img-lazy>
    </div>

    <div v-if="heroes[6].state">
      <p>{{ heroes[6].text }} : {{ priest_cards.length }}</p>
      <b-img-lazy v-for="card in priest_cards" :key="card.id" :src="card.image" width="181" height="250"></b-img-lazy>
    </div>

    <div v-if="heroes[7].state">
      <p>{{ heroes[7].text }} : {{ warlock_cards.length }}</p>
      <b-img-lazy v-for="card in warlock_cards" :key="card.id" :src="card.image" width="181" height="250"></b-img-lazy>
    </div>

    <div v-if="heroes[8].state">
      <p>{{ heroes[8].text }} : {{ paladin_cards.length }}</p>
      <b-img-lazy v-for="card in paladin_cards" :key="card.id" :src="card.image" width="181" height="250"></b-img-lazy>
    </div>

    <div v-if="heroes[9].state">
      <p>{{ heroes[9].text }} : {{ demonhunter_cards.length }}</p>
      <b-img-lazy v-for="card in demonhunter_cards" :key="card.id" :src="card.image" width="181" height="250"></b-img-lazy>
    </div>

    <div v-if="heroes[10].state">
      <p>{{ heroes[10].text }} : {{ neutral_cards.length }}</p>
      <b-img-lazy v-for="card in neutral_cards" :key="card.id" :src="card.image" width="181" height="250"></b-img-lazy>
    </div> -->
  </div>
</template>

<script>
export default {
  name: 'ArenaCardsFromDecks',
  data() {
    return {
      heroes: [
        { value: 'hunter', text: 'Hunter', state: false, id: 3 },
        { value: 'mage', text: 'Mage', state: false, id: 4 },
        { value: 'warrior', text: 'Warrior', state: false, id: 10 },
        { value: 'druid', text: 'Druid', state: false, id: 2 },
        { value: 'rogue', text: 'Rogue', state: false, id: 7 },
        { value: 'shaman', text: 'Shaman', state: false, id: 8 },
        { value: 'priest', text: 'Priest', state: false, id: 6 },
        { value: 'warlock', text: 'Warlock', state: false, id: 9 },
        { value: 'paladin', text: 'Paladin', state: false, id: 5 },
        { value: 'demonhunter', text: 'Demon Hunter', state: false, id: 14 },
        { value: 'neutral', text: 'Neutral', state: false, id: 12 }
      ],
      ranger: 50,
      filters: {
        classId: [],
        manaCost: '0'
      },
      trololo: '',
      ok: false
    };
  },
  computed: {
    new_cards() {
      return this.$store.state.axiosFetch.newCards;
    },
    hunter_cards() {
      return this.$store.state.axiosFetch.cards.filter(({ classId }) => classId === 3).sort((a, b) => a.manaCost - b.manaCost);
    },
    mage_cards() {
      return this.$store.state.axiosFetch.cards.filter(({ classId }) => classId === 4).sort((a, b) => a.manaCost - b.manaCost);
    },
    druid_cards() {
      return this.$store.state.axiosFetch.cards.filter(({ classId }) => classId === 2).sort((a, b) => a.manaCost - b.manaCost);
    },
    paladin_cards() {
      return this.$store.state.axiosFetch.cards.filter(({ classId }) => classId === 5).sort((a, b) => a.manaCost - b.manaCost);
    },
    priest_cards() {
      return this.$store.state.axiosFetch.cards.filter(({ classId }) => classId === 6).sort((a, b) => a.manaCost - b.manaCost);
    },
    demonhunter_cards() {
      return this.$store.state.axiosFetch.cards.filter(({ classId }) => classId === 14).sort((a, b) => a.manaCost - b.manaCost);
    },
    rogue_cards() {
      return this.$store.state.axiosFetch.cards.filter(({ classId }) => classId === 7).sort((a, b) => a.manaCost - b.manaCost);
    },
    shaman_cards() {
      return this.$store.state.axiosFetch.cards.filter(({ classId }) => classId === 8).sort((a, b) => a.manaCost - b.manaCost);
    },
    warlock_cards() {
      return this.$store.state.axiosFetch.cards.filter(({ classId }) => classId === 9).sort((a, b) => a.manaCost - b.manaCost);
    },
    warrior_cards() {
      return this.$store.state.axiosFetch.cards.filter(({ classId }) => classId === 10).sort((a, b) => a.manaCost - b.manaCost);
    },
    neutral_cards() {
      return this.$store.state.axiosFetch.cards.filter(({ classId }) => classId === 12).sort((a, b) => a.manaCost - b.manaCost);
    },
    numberOfCards() {
      return this.$store.state.axiosFetch.cards.length;
    }
  },
  methods: {
    bake(id) {
      this.filters.classId.push(id);
    },
    multiFilter() {
      const cards = this.$store.state.axiosFetch.cards;
      this.ok = !this.ok;
      console.log(this.filters);
      console.log('Filtering ' + cards.length + ' cards with class id:' + this.filters.classId + ' and mana cost ' + this.filters.manaCost);
      this.trololo = cards.filter(card => {
        return Object.entries(this.filters).every(([filterProperty, filterValues]) => {
          switch (Object.prototype.toString.call(card[filterProperty])) {
            case '[object Object]':
              return Object.entries(filterValues).every(([extFilterProperty, extFilterValue]) => {
                return new Map(Object.entries(card[filterProperty])).get(extFilterProperty) === extFilterValue;
              });

            case '[object Array]':
              return card[filterProperty].some(cardValue => {
                return filterValues.includes(cardValue);
              });

            default:
              return filterValues == card[filterProperty];
          }
        });
      });

      return this.trololo;
    }
  }
};
</script>

<style scoped>
.bake {
  margin: 10px;
  /* border: 1px solid red; */
}
</style>
