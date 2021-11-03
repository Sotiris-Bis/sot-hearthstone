<template>
  <div class="container">
    <b-container fluid>
      <b-row>
        <b-col lg="6" class="my-1">
          <p>Select a class</p>
          <b-form-select v-model="selected" :options="heroes" class="select transparent"></b-form-select>
        </b-col>
        <b-col lg="6" class="my-1">
          <p>Select a Deck</p>
          <b-form-select v-model="selectedDeck" :options="sets" class="select transparent"> </b-form-select>
        </b-col>
      </b-row>
    </b-container>
    <div class="container">
      <div>
        Showing: <b>{{ getClassByid(selected) }}</b> cards
        <br />
        <hr />
        Minios:<b>{{ totalMinios.length }}</b> Spells:<b>{{ totalSpells.length }}</b>

        Weapons:<b>{{ totalWeapons.length }}</b>

        of <b>{{ numberOfFilteredCards }} </b>cards.

        <hr />
        Beasts: <b>{{ totalBeasts.length }}</b> | Murlocs: <b>{{ totalMurlocs.length }}</b>

        | Elementals: <b>{{ totalElementals.length }}</b> | Mechs:<b> {{ totalMechs.length }}</b> | Demons: <b>{{ totalDemons.length }}</b>

        | Pirates:<b> {{ totalPirates.length }}</b> | Totems: <b>{{ totalTotems.length }}</b> | Dragons:<b> {{ totalDragons.length }}</b> |
        All types:<b> {{ totalAll.length }}</b>
      </div>
      <hr />
    </div>
    <b-container fluid>
      <b-row>
        <b-col lg="6" class="my-1">
          <b-form-group label="Filter" label-for="filter-input" label-cols-sm="3" label-align-sm="right" label-size="sm" class="mb-0">
            <b-input-group size="sm">
              <b-form-input
                id="filter-input"
                v-model="filter"
                type="search"
                placeholder="Type to Search"
                class="transparent text-white"
              ></b-form-input>

              <b-input-group-append>
                <b-button :disabled="!filter" @click="filter = ''">Clear</b-button>
              </b-input-group-append>
            </b-input-group>
          </b-form-group>
        </b-col>

        <b-col lg="6" class="my-1">
          <b-form-group
            v-model="sortDirection"
            label="Filter On"
            description="Leave all unchecked to filter on all data"
            label-cols-sm="4"
            label-align-sm="right"
            label-size="sm"
            class="mb-0 "
            v-slot="{ ariaDescribedby }"
          >
            <b-form-checkbox-group v-model="filterOn" :aria-describedby="ariaDescribedby" class="mt-1">
              <b-form-checkbox value="name">Name</b-form-checkbox>
              <b-form-checkbox value="manaCost">Mana Cost</b-form-checkbox>
              <b-form-checkbox value="text">Text</b-form-checkbox>
              <b-form-checkbox value="minionTypeId">Minion Type</b-form-checkbox>
            </b-form-checkbox-group>
          </b-form-group>
        </b-col>

        <b-col sm="5" md="6" class="my-1">
          <b-form-group
            label="Per page"
            label-for="per-page-select"
            label-cols-sm="6"
            label-cols-md="4"
            label-cols-lg="3"
            label-align-sm="right"
            label-size="sm"
            class="mb-0"
          >
            <b-form-select id="per-page-select" v-model="perPage" :options="pageOptions" size="sm" class="transparent"></b-form-select>
          </b-form-group>
        </b-col>
        <b-col>
          <b-button @click="firstPage" pill class="bg-transparent">First</b-button>
          <b-button @click="prevPage" pill class="bg-transparent">Previous</b-button>
          <b-button @click="nextPage" pill class="bg-transparent">Next</b-button>
          <b-button @click="lastPage" pill class="bg-transparent">Last</b-button>
        </b-col>
      </b-row>

      <b-table
        :fields="fields"
        :items="filteredCards"
        sort-icon-left
        bordered
        :class="classes"
        :current-page="currentPage"
        :per-page="perPage"
        :filter="filter"
        :filter-included-fields="filterOn"
        @filtered="onFiltered"
      >
        <template #cell(image)="data">
          <b-img-lazy :src="data.value" width="90" height="120" class="zoom"></b-img-lazy>
        </template>
        <template #cell(text)="data">
          <span v-html="data.value"></span>
        </template>
        <template #cell(multiClassIds)="data"> {{ getClassByid(data.value[0]) }} * {{ getClassByid(data.value[1]) }} </template>
        <!-- <template #cell(cardTypeId)="data">
          {{ cardType(data.value) }}
        </template> -->
      </b-table>
      <b-row>
        <b-col sm="5" md="6" class="my-1">
          <b-form-group
            label="Per page"
            label-for="per-page-select"
            label-cols-sm="6"
            label-cols-md="4"
            label-cols-lg="3"
            label-align-sm="right"
            label-size="sm"
            class="mb-0"
          >
            <b-form-select id="per-page-select" v-model="perPage" :options="pageOptions" size="sm" class="transparent"></b-form-select>
          </b-form-group>
        </b-col>
        <b-col>
          <b-button @click="firstPage" pill class="bg-transparent">First</b-button>
          <b-button @click="prevPage" pill class="bg-transparent">Previous</b-button>
          <b-button @click="nextPage" pill class="bg-transparent">Next</b-button>
          <b-button @click="lastPage" pill class="bg-transparent">Last</b-button>
        </b-col>
      </b-row>
    </b-container>
    <div class="container">
      <hr />
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';
export default {
  name: 'PerDeck',
  data() {
    return {
      transProps: {
        // Transition name
        name: 'flip-list'
      },
      fields: [
        {
          label: 'Name',
          key: 'name',
          sortable: true
        },
        {
          label: 'Image',
          key: 'image'
        },
        {
          label: 'Class',
          key: 'classId',
          sortable: true,
          formatter: value => {
            return this.getClassByid(value);
          },
          sortByFormatted: true,
          filterByFormatted: true
        },
        {
          label: 'Classes',
          key: 'multiClassIds',
          sortable: true
          //   formatter: value => {
          //       return this.getClassByid(value)
          //     }
        },
        {
          label: 'Mana Cost',
          key: 'manaCost',
          sortable: true
        },
        {
          label: 'Text',
          key: 'text'
        },
        {
          label: 'Minion Type',
          key: 'minionTypeId',
          sortable: true,
          formatter: value => {
            return this.returnType(value);
          },
          sortByFormatted: true,
          filterByFormatted: true
        },
        {
          label: 'Type',
          key: 'cardTypeId',
          sortable: true,
          formatter: value => {
            return this.cardType(value);
          }
        },
        {
          label: 'Rarity',
          key: 'rarityId',
          sortable: true,
          formatter: value => {
            return this.rarity(value);
          }
        }
      ],
      selected: null,
      selectedDeck: null,
      manaCostOptions: [
        { value: null, text: 'Any' },
        { value: 0, text: 0 },
        { value: 1, text: 1 },
        { value: 2, text: 2 },
        { value: 3, text: 3 },
        { value: 4, text: 4 },
        { value: 5, text: 5 },
        { value: 6, text: 6 },
        { value: 7, text: 7 },
        { value: 8, text: 8 },
        { value: 9, text: 9 },
        { value: 10, text: 10 },
        { value: 11, text: 11 },
        { value: 12, text: 12 }
      ],
      heroes: [
        { value: null, text: 'All Cards' },
        { value: 14, text: 'Demon Hunter' },
        { value: 2, text: 'Druid' },
        { value: 3, text: 'Hunter' },
        { value: 4, text: 'Mage' },
        { value: 5, text: 'Paladin' },
        { value: 6, text: 'Priest' },
        { value: 7, text: 'Rogue' },
        { value: 8, text: 'Shaman' },
        { value: 9, text: 'Warlock' },
        { value: 10, text: 'Warrior' },
        { value: 12, text: 'Neutral' }
      ],
      totalRows: 1,
      currentPage: 1,
      perPage: 5,
      pageOptions: [5, 10, 15, 20, { value: 100, text: 'Show a lot' }],
      filter: null,
      filterOn: [],
      sortDirection: 'asc'
    };
  },
  mounted() {
    // Set the initial number of items
    this.totalRows = this.filteredCards.length;
  },
  methods: {
    nextPage() {
      if (this.currentPage * this.perPage < this.filteredCards.length) this.currentPage++;
    },
    prevPage() {
      if (this.currentPage > 1) this.currentPage--;
    },
    firstPage() {
      if (this.currentPage > 1) this.currentPage = 1;
    },
    lastPage() {
      this.currentPage = this.filteredCards.length / this.perPage + 1;
    },
    rarity(number) {
      switch (number) {
        case 1:
          return 'Common';
        case 2:
          return 'Free';
        case 3:
          return 'Rare';
        case 4:
          return 'Epic';
        case 5:
          return 'Legendary';
      }
    },
    getClassByid(id) {
      switch (id) {
        case 2:
          return 'Druid';
        case 3:
          return 'Hunter';

        case 4:
          return 'Mage';

        case 5:
          return 'Paladin';

        case 6:
          return 'Priest';

        case 7:
          return 'Rogue';

        case 8:
          return 'Shaman';

        case 9:
          return 'Warlock';

        case 10:
          return 'Warrior';
        case 12:
          return 'Neutral';
        case 14:
          return 'Demonhunter';
        case 26:
          return 'All';
        default:
          return '';
      }
    },
    returnType(number) {
      switch (number) {
        case 14:
          return 'Murloc';
        case 15:
          return 'Demon';

        case 17:
          return 'Mech';

        case 18:
          return 'Elemental';

        case 20:
          return 'Beast';

        case 21:
          return 'Totem';

        case 23:
          return 'Pirate';

        case 24:
          return 'Dragon';

        case 26:
          return 'All';
        case 43:
          return 'Quilboar';
        default:
          return '';
      }
    },
    cardType(number) {
      switch (number) {
        case 4:
          return 'Minion';
        case 5:
          return 'Spell';

        case 3:
          return 'Hero';

        case 7:
          return 'Weapon';
        default:
          return '';
      }
    },
    onFiltered(filteredItems) {
      // Trigger pagination to update the number of buttons/pages due to filtering
      this.totalRows = filteredItems.length;
      this.currentPage = 1;
    }
  },
  computed: {
    classes() {
      if (this.$store.state.theme == 'dark') {
        return 'text-white';
      } else return '';
    },
    types() {
      return this.$store.state.minionTypes;
    },
    filteredCards() {
      if (this.selected == null && this.selectedDeck == 1000) {
        return this.stCards;
      } else if (this.selected !== null && this.selectedDeck == 1000) {
        return this.stCards.filter(card => card.classId == this.selected || card.multiClassIds.includes(this.selected));
      } else if (this.selected == null && this.selectedDeck == null) {
        return this.cards;
      } else if (this.selected !== null && this.selectedDeck == null) {
        return this.cards.filter(card => card.classId == this.selected || card.multiClassIds.includes(this.selected));
      } else if (this.selected == null && this.selectedDeck !== null) {
        return this.cards.filter(card => card.cardSetId == this.selectedDeck);
      } else
        return this.cards
          .filter(card => card.classId == this.selected || card.multiClassIds.includes(this.selected))
          .filter(card => card.cardSetId == this.selectedDeck);
    },
    ...mapState({
      cards: state => state.axiosFetch.cards,
      sets: state => state.axiosFetch.sets,
      stCards: state => state.axiosFetch.standarCards
    }),
    // arenaCards() {
    //   return this.cards.filter(
    //     card =>
    //       card.cardSetId == 25 ||
    //       card.cardSetId == 1130 ||
    //       card.cardSetId == 1414 ||
    //       card.cardSetId == 1525 ||
    //       card.cardSetId == 1443 ||
    //       card.cardSetId == 1466 ||
    //       card.cardSetId == 1637
    //   );
    // },

    totalSpells() {
      return this.filteredCards.filter(card => card.cardTypeId == 5);
    },
    totalWeapons() {
      return this.filteredCards.filter(card => card.cardTypeId == 7);
    },
    totalMinios() {
      return this.filteredCards.filter(card => card.cardTypeId == 4);
    },
    numberOfFilteredCards() {
      return this.totalMinios.length + this.totalSpells.length + this.totalWeapons.length;
    },
    totalBeasts() {
      return this.filteredCards.filter(card => card.minionTypeId == 20);
    },
    totalMurlocs() {
      return this.filteredCards.filter(card => card.minionTypeId == 14);
    },
    totalDemons() {
      return this.filteredCards.filter(card => card.minionTypeId == 15);
    },
    totalMechs() {
      return this.filteredCards.filter(card => card.minionTypeId == 17);
    },
    totalElementals() {
      return this.filteredCards.filter(card => card.minionTypeId == 18);
    },
    totalTotems() {
      return this.filteredCards.filter(card => card.minionTypeId == 21);
    },
    totalPirates() {
      return this.filteredCards.filter(card => card.minionTypeId == 23);
    },
    totalDragons() {
      return this.filteredCards.filter(card => card.minionTypeId == 24);
    },
    totalAll() {
      return this.filteredCards.filter(card => card.minionTypeId == 26);
    }
  }
};
</script>

<style scoped>
.zoom:hover {
  transform: scale(3);
}
table .flip-list-move {
  transition: transform 1s;
}
.select {
  max-width: 35vw;
}

.transparent {
  background-color: transparent;
}
#pagination {
  background-color: transparent;
}
.input {
  color: white;
}
</style>
