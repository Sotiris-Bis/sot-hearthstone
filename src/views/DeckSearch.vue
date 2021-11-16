<template>
  <div class="container" ref="start">
    <h3>{{ $t('message10') }}</h3>
    <form>
      <input type="text" v-model="search" refs="bake" />
      <br />
      <button class="bg-transparent" type="submit" @click.prevent="get">{{ $t('button3') }}</button>
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
            :deckCode="arr"
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
        <b-col>
          <TwelveWins
            heroClass="Priest"
            title="Priest"
            date="6th july 2021"
            text="It's time to pray"
            @clicked="getMyDeck"
            :loaded="loaded"
            deckCode="`AAEBAa0GGLC6A5QPtuEDvdMCku4Dw8wD/tEDr7oDx+ED6boD8wzy6QPj0QPy3gOEnwSQEPCfBIoQmqAE5b4D28wD6NAC/N8DrNQDA5kQuuED+t8DAA==`"
            :photoUrl="img10"
          />
        </b-col>
        <b-col>
          <TwelveWins
            heroClass="Druid"
            title="Druid"
            date="21st july 2021"
            text="Summer time whipping"
            @clicked="getMyDeck"
            :loaded="loaded"
            deckCode="`AAEBAZICHpWgBLegBIrkA5jSAqTvA4/kA7AQ174DpKAEgRC57APH4QPkugPcoAShnwTy6QOz3AOboASmnwTY5QKAENHhApLNA7rhA5kQvuwD7boDrNQD3uwDlOADAAA=`"
            :photoUrl="img11"
          />
        </b-col>
        <b-col>
          <TwelveWins
            heroClass="Warlock"
            title="Warlock"
            date="04th Oct 2021"
            text="You face Jaraxxus eredar lord of the burning legion"
            @clicked="getMyDeck"
            :loaded="loaded"
            deckCode="`AAEBAf0GHLi0BLGfBIP7A8P5A+egBK+nA8n5A5LuA4jvA6vsA+3hA+/tA8j5A/LtA4r0A5boA4H7A/jjA+DxA8/5A+3pA+bhA7/sAtiJA4OgBNn5A4WgBPHpAwGS3gMA`"
            :photoUrl="img12"
          />
        </b-col>
      </b-row>
      <b-row>
        <b-col>
          <TwelveWins
            heroClass="Demonhunter"
            title="Demonhunter"
            date="10th Oct 2021"
            text="Crazy Tempo"
            @clicked="getDeckWithTriples"
            :loaded="loaded"
            :deckCode="array3"
            :photoUrl="img13"
          />
        </b-col>
        <b-col>
          <TwelveWins
            heroClass="Warlock"
            title="Warlock"
            date="15th Oct 2021"
            text="Crazy Tempo once again "
            @clicked="getDeckWithTriples"
            :loaded="loaded"
            :deckCode="array4"
            :photoUrl="img14"
          />
        </b-col>
        <b-col>
          <TwelveWins
            heroClass="Priest-Mage"
            title="Priest Mage"
            date="07th Nov 2021"
            text="Time may pass but the dream is eternal!"
            @clicked="getDeckWithTriples"
            :loaded="loaded"
            :deckCode="array5"
            :photoUrl="img15"
          />
        </b-col>
      </b-row>
      <b-row>
        <hr />
      </b-row>
      <section ref="trolompoukis">
        <b-row>
          <b-container v-if="loaded">
            <h2>{{ hero.name }} {{ heroClass }}</h2>
            <h4>{{ $t('Format') }}: {{ $t('Wild') }}</h4>

            <b-container fluid class="p-4">
              <b-img v-for="(card, index) in sortFunc()" :key="index" :src="card.image" :alt="card.name" height="414" width="300" />
            </b-container>

            <b-row>
              <b-button class="bg-transparent" :class="isDark ? 'text-white' : 'text-dark'" @click="close"> Hide Deck </b-button>
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
import { mapState } from 'vuex';

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
      heroClass: '',
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
      ],
      arr: [
        59029,
        58452,
        58452,
        61939,
        59724,
        41245,
        56587,
        41524,
        59646,
        69507,
        69504,
        58183,
        61271,
        41328,
        61269,
        58973,
        61940,
        59036,
        61674,
        61674,
        61625,
        61625,
        59027,
        61132,
        39210,
        57186,
        58971,
        58971,
        58971,
        60143
      ],
      array3: [
        63682,
        64372,
        61131,
        61297,
        64707,
        64707,
        68468,
        64713,
        72250,
        61898,
        69507,
        69504,
        63407,
        69680,
        62481,
        64712,
        62548,
        61129,
        61129,
        61129,
        64714,
        62581,
        50412,
        62701,
        64702,
        61626,
        63397,
        64716,
        64716,
        54272
      ],
      array4: [
        63369,
        54730,
        54429,
        50002,
        53882,
        64707,
        64707,
        64707,
        53970,
        64713,
        61622,
        69536,
        50083,
        63368,
        61677,
        69734,
        61941,
        53883,
        69725,
        48110,
        49066,
        61674,
        64719,
        64895,
        69658,
        69520,
        66259,
        54267,
        66864,
        54272
      ],
      array5: [
        57184,
        69509,
        64707,
        64008,
        52935,
        64713,
        64713,
        41176,
        41245,
        56603,
        42992,
        69606,
        69716,
        40921,
        69721,
        64709,
        64704,
        42442,
        52285,
        40378,
        64702,
        64711,
        57186,
        57186,
        52487,
        69674,
        42790,
        64716,
        64716,
        66868
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
      const lang = this.$store.state.lang;
      axios
        .get(`https://eu.api.blizzard.com/hearthstone/deck?locale=${lang}&code=${deck}&access_token=${token}`)
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
      const lang = this.$store.state.lang;
      let deckCards = [];
      if (this.loaded == true) {
        this.focusOnCardList();
      } else
        for (let i = 0; i <= deck.length - 1; i++) {
          axios
            .get(`https://us.api.blizzard.com/hearthstone/cards/${deck[i]}?locale=${lang}&access_token=${token}`)
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
            })
            .then(() => {
              this.focusOnCardList();
            });
        }

      this.loaded = !this.loaded;
      this.cards = deckCards;
      this.deckCode = 'No cade due to triplets';
      this.hero.name = this.heroClass;
      this.format = 'Wild';
      if (this.loaded == false) {
        this.focusOnCardList();
      } else this.focusOnTopOfPage();
    }
  },
  computed: {
    ...mapState({ theme: state => state.theme }),
    isDark() {
      if (this.theme == 'dark') {
        return true;
      } else return false;
    },
    img1() {
      return require('../assets/images/Capture1.jpg');
    },
    img2() {
      return require('../assets/images/paladin1.jpg');
    },
    img3() {
      return require('../assets/images/tseris2.jpg');
    },
    img4() {
      return require('../assets/images/napo1.jpg');
    },
    img5() {
      return require('../assets/images/Shaman1.jpg');
    },
    img6() {
      return require('../assets/images/tseris-warrior-1.jpg');
    },
    img7() {
      return require('../assets/images/napo-shaman1.jpg');
    },
    img8() {
      return require('../assets/images/warriorFlawless1.jpg');
    },
    img9() {
      return require('../assets/images/demonHunter1.jpg');
    },
    img10() {
      return require('../assets/images/priest1.jpg');
    },
    img11() {
      return require('../assets/images/druid-napo1.jpg');
    },
    img12() {
      return require('../assets/images/warlock1.jpg');
    },
    img13() {
      return require('../assets/images/Napo_DH1.jpg');
    },
    img14() {
      return require('../assets/images/warlockNapo1.jpg');
    },
    img15() {
      return require('../assets/images/priest_mage1.jpeg');
    }
  }
};
</script>
<style scoped>
.zoom:hover {
  transform: scale(1.5);
}
</style>
