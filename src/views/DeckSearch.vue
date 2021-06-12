<template>
  <div class="container" ref="start">
    <h3>Type a deck code to get the cards</h3>
    <form>
      <input type="text" v-model="search" refs="bake" />
      <br />
      <button class="bg-transparent" type="submit" @click.prevent="get">Search</button>
    </form>
    <br />

    <b-container fluid>
      <b-row>
        <b-col>
          <TwelveWins
            heroClass="Demonhunter"
            title="Demonhunter"
            date="6th February 2021"
            text="Crazy tempo, fun and fast"
            @clicked="getMyDeck"
            :loaded="loaded"
            deckCode="`AAEBAea5AxiVzQPUyAPH3QPz4wPM0gOdwgKLugO0xAL+0QOHugPYuwPHxgPX3gPwwgLV3gPdzAP04wOczQOTzQPM3QOqsgLivgPr9gLv1QMD6uEDueED28wDAA==`"
            :photoUrl="img1"
          />
        </b-col>
        <b-col>
          <TwelveWins
            heroClass="Paladin"
            title="Paladin"
            date="17th March 2021"
            text="Hammer of the Naaru..."
            @clicked="getMyDeck"
            :loaded="loaded"
            deckCode="`AAEBAZ8FFtj+At0K374D/geR5AOz3gP63gP+0QPK4wOl9QLK0QORswL03wOz3AP6AY3hA/AD2cICuuED4r4D28wD6L4DBMrDAuH+AqzCAoXeAwA=`"
            :photoUrl="img2"
          />
        </b-col>
        <b-col>
          <TwelveWins
            heroClass="Warrior"
            title="Warrior"
            date="1st April 2021"
            text="No spells, No problem."
            @clicked="getMyDeck"
            :loaded="loaded"
            deckCode="`AAEBAQcWq9QDh78CkQaS0AOVzQPizAOfzQP6BfPeA8bDAorQA6e%2BAvnoA5boA9m%2BA%2BS%2BA7m%2FAr2YA9zbA%2BrhA%2Bi%2BA4zUAwSnzgOonwTy6QPV8QMA`"
            :photoUrl="img3"
          />
        </b-col>
      </b-row>
      <b-row>
        <b-col>
          <TwelveWins
            heroClass="Demonhunter"
            title="Demonhunter"
            date="09th April 2021"
            text="Too fast, too furius..."
            @clicked="getDeckWithTriples"
            :loaded="loaded"
            :deckCode="array1"
            :photoUrl="img1"
          />
        </b-col>
        <b-col>
          <TwelveWins
            heroClass="Shaman"
            title="Shaman"
            date="14th April 2021"
            text="Kill em all"
            @clicked="getDeckWithTriples"
            :loaded="loaded"
            :deckCode="array2"
            :photoUrl="img5"
          />
        </b-col>
        <b-col>
          <TwelveWins
            heroClass="Warrior"
            title="Warrior"
            date="28th April 2021"
            text="by Mortician, with love..."
            @clicked="getMyDeck"
            :loaded="loaded"
            deckCode="`AAEBAQcY4swDh78Cn58EwZgDmZQD8J4D3b4DjaAE+bwCz78CkKAE++gD8ukD/+cD2b4D5L4D6uED5b4Dh5oD6L4D5uEDoJ4Dq9QDtIoEA7y5A4ygBI7tAwA=`"
            :photoUrl="img6"
          />
        </b-col>
      </b-row>
      <b-row>
        <b-col>
          <TwelveWins
            heroClass="Shaman"
            title="Shaman"
            date="9th May 2021"
            text="Keymaster Alabaster..."
            @clicked="getMyDeck"
            :loaded="loaded"
            deckCode="`AAEBAaoIForkA97EAt++A9e+A5HkA/sBioADtuEDt6wDx+ED/58E5r4DlrkDmeoDodED/p8E+58Ek80D5b4D4r4D9t0DrZEDBP2fBJi5A4zUA9i+AwA=`"
            :photoUrl="img7"
          />
        </b-col>
        <b-col>
          <TwelveWins
            heroClass="Warrior"
            title="Warrior"
            date="25th May 2021"
            text="Grommash + Ysera = Flawless"
            @clicked="getMyDeck"
            :loaded="loaded"
            deckCode="`AAEBAQca4swD174DmO0DtJEDtt4D/tEDx+EDjgXWvgPmvgPcD/kM8t4Dju0DS+3pA0SM1APImAOcuwPYvgPm4QPSAqzUA6CeA7SKBAK8uQO13gMA`"
            :photoUrl="img8"
          />
        </b-col>
        <b-col>
          <TwelveWins
            heroClass="Demonhunter"
            title="Demonhunter"
            date="5th june 2021"
            text="You... are not, PREPARED"
            @clicked="getMyDeck"
            :loaded="loaded"
            deckCode="`AAEBAea5AxrH3QPC8QOtoASQ5AOBEO/pA5jqA4+gBIfoApHoA9XeA73tA/TfA4fUA9HNA8ndA/XoA4GfBO7pA5PNA9vMA9nGA6XvA4CFBO/VA/O7AwKv7wO64QMA`"
            :photoUrl="img9"
          />
        </b-col>
      </b-row>

      <b-row>
        <hr />
      </b-row>
      <section ref="trolompoukis">
        <b-row>
          <b-container v-if="loaded">
            <h2>{{ hero.name }}</h2>
            <h4>Format: {{ format.toUpperCase() }}</h4>

            <b-container fluid class="p-4">
              <b-img
                v-for="(card, index) in sortFunc()"
                :key="index"
                :src="card.image"
                :alt="card.name"
                height="414"
                width="300"
              />
            </b-container>

            <b-row>
              <b-button class="bg-transparent text-dark" @click="close"> Hide Deck </b-button>
            </b-row>
            <b-row>
              <hr />
            </b-row>
            <b-row>
              <hr />
            </b-row>
          </b-container>
        </b-row>
      </section>
    </b-container>
    <hr />
  </div>
</template>

<script>
import axios from 'axios';
import TwelveWins from '../components/TwelveWins.vue';

export default {
  name: 'DeckSearch',
  components: { TwelveWins },
  data() {
    return {
      search: '',
      cards: [],
      deckCode: '',
      hero: {},
      format: '',
      loaded: false,
      array1: [
        59394,
        61127,
        57182,
        61939,
        52866,
        58495,
        56820,
        56820,
        59259,
        56391,
        59914,
        61273,
        61133,
        63726,
        62585,
        62482,
        69716,
        56860,
        62548,
        62548,
        62548,
        40289,
        52418,
        61129,
        61674,
        59027,
        61132,
        61626,
        57176,
        58455
      ],
      array2: [
        62442,
        61226,
        60043,
        52935,
        62703,
        58790,
        57174,
        62481,
        56411,
        56411,
        56411,
        69725,
        61224,
        61227,
        57177,
        60979,
        62745,
        63508,
        59553,
        63380,
        52278,
        69899,
        57180,
        40700,
        68333,
        59916,
        61670,
        51722,
        61629,
        61629
      ]
    };
  },
  methods: {
    focusOnCardList() {
      this.$refs.trolompoukis.scrollIntoView({ behavior: 'smooth', block: 'start', inline: 'start' });
    },
    focusOnTopOfPage() {
      this.$refs.start.scrollIntoView({ behavior: 'smooth', block: 'start', inline: 'start' });
    },
    close() {
      this.loaded = !this.loaded;
      this.focusOnTopOfPage();
    },
    get() {
      const token = this.$store.state.oauth.accessToken;
      const code = this.search;
      if (code != '') {
        axios
          .get(`https://eu.api.blizzard.com/hearthstone/deck?locale=en_US&code=${code}&access_token=${token}`)
          .then(res => {
            this.loaded = !this.loaded;
            this.cards = res.data.cards;
            this.deckCode = res.data.deckCode;
            this.hero = res.data.hero;
            this.format = res.data.format;
          })
          .catch(error => {
            const notification = {
              type: 'error',
              message: 'There was an error retrieving your deck ' + error.message
            };
            this.$store.dispatch('addNotification', notification, { root: true });
            throw error;
          });
      }
    },
    getMyDeck(deck) {
      const token = this.$store.state.oauth.accessToken;
      axios
        .get(`https://eu.api.blizzard.com/hearthstone/deck?locale=en_US&code=${deck}&access_token=${token}`)
        .then(res => {
          this.loaded = !this.loaded;
          this.cards = res.data.cards;
          this.deckCode = res.data.deckCode;
          this.hero = res.data.hero;
          this.format = res.data.format;
        })
        .catch(error => {
          const notification = {
            type: 'error',
            message: 'There was an error retrieving your deck ' + error.message
          };
          this.$store.dispatch('addNotification', notification, { root: true });
          throw error;
        });
      if (this.loaded == false) {
        this.focusOnCardList();
      } else this.focusOnTopOfPage();
    },
    sortFunc: function() {
      return this.cards.slice().sort(function(a, b) {
        return a.manaCost > b.manaCost ? 1 : -1;
      });
    },
    getDeckWithTriples(deck) {
      const token = this.$store.state.oauth.accessToken;
      let deckCards = [];
      for (let i = 0; i <= deck.length - 1; i++) {
        axios
          .get(`https://us.api.blizzard.com/hearthstone/cards/${deck[i]}?locale=en_US&access_token=${token}`)
          .then(res => {
            deckCards.push(res.data);
          })
          .catch(error => {
            const notification = {
              type: 'error',
              message: 'There was an error retrieving your deck ' + error.message
            };
            this.$store.dispatch('addNotification', notification, { root: true });
            throw error;
          });
      }

      this.loaded = !this.loaded;
      this.cards = deckCards;
      this.deckCode = 'No cade due to triplets';
      this.hero.name = name;
      this.format = 'Wild';
      if (this.loaded == false) {
        this.focusOnCardList();
      } else this.focusOnTopOfPage();
    }
  },
  computed: {
    img1() {
      return require('../assets/Capture1.jpg');
    },
    img2() {
      return require('../assets/paladin1.jpg');
    },
    img3() {
      return require('../assets/tseris2.jpg');
    },
    img4() {
      return require('../assets/napo1.jpg');
    },
    img5() {
      return require('../assets/Shaman1.jpg');
    },
    img6() {
      return require('../assets/tseris-warrior-1.jpg');
    },
    img7() {
      return require('../assets/napo-shaman1.jpg');
    },
    img8() {
      return require('../assets/warriorFlawless1.jpg');
    },
    img9() {
      return require('../assets/demonHunter1.jpg');
    }
  }
};
</script>
<style scoped>
.zoom:hover {
  transform: scale(1.5);
}
</style>
