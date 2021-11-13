<template>
  <b-container fluid>
    <b-container fluid>
      <b-row>
        <b-col>
          <h2 class="text-success font-italic">Hallow’s End Dual-Class Arena event</h2>
        </b-col>
      </b-row>

      <b-row>
        <b-container class="bg-transparent box">
          <label for="filterTermName">Name </label>
          <b-form-input
            type="text"
            v-model="filterTermName"
            id="filterTermName"
            :class="{ 'text-white': isDark }"
            class="bg-transparent maxWidth150"
            @change="thisShouldTriggerRecompute()"
            tabindex="0"
          />
        </b-container>
        <b-container class="bg-transparent box">
          <label for="filterTermHero">Class </label>
          <b-form-select
            tabindex="0"
            v-model="filterTermHero"
            id="filterTermHero"
            class="bg-transparent maxWidth150"
            @change="thisShouldTriggerRecompute()"
          >
            <option selected :value="null">Any</option>
            <option v-for="option in heroes" :key="option.id" :value="option.id">
              {{ option.name }}
            </option>
          </b-form-select>
        </b-container>
        <b-container class="bg-transparent box">
          <label for="filterTermManaCost">Mana cost </label>
          <b-form-select
            tabindex="0"
            v-model="filterTermManaCost"
            id="filterTermManaCost"
            class="bg-transparent maxWidth75"
            @change="thisShouldTriggerRecompute()"
          >
            <option v-for="option in manaCostOptions" :key="option.id" :value="option.value">
              {{ option.text }}
            </option>
          </b-form-select>
        </b-container>
        <b-container class="bg-transparent box">
          <label for="filterTermMinionType">Minion type </label>
          <b-form-select
            v-model="filterTermMinionType"
            id="filterTermMinionType"
            class="bg-transparent maxWidth100"
            @change="thisShouldTriggerRecompute()"
            tabindex="0"
          >
            <option selected :value="null">Any</option>
            <option v-for="option in minionTypes" :key="option.id" :value="option.id">
              {{ option.name }}
            </option>
          </b-form-select>
        </b-container>
        <b-container class="bg-transparent box">
          <label for="filterTermRarity">Rarity </label>
          <b-form-select
            tabindex="0"
            v-model="filterTermRarity"
            id="filterTermRarity"
            class="bg-transparent maxWidth100"
            @change="thisShouldTriggerRecompute()"
          >
            <option selected :value="null">Any</option>
            <option v-for="option in rarities" :key="option.id" :value="option.id">
              {{ option.name }}
            </option>
          </b-form-select>
        </b-container>
        <b-container class="bg-transparent box">
          <label for="filterTermType">Type </label>
          <b-form-select
            tabindex="0"
            v-model="filterTermType"
            id="filterTermType"
            class="bg-transparent maxWidth100"
            @change="thisShouldTriggerRecompute()"
          >
            <option selected :value="null">Any</option>
            <option v-for="option in types" :key="option.id" :value="option.id">
              {{ option.name }}
            </option>
          </b-form-select>
        </b-container>
        <b-container class="bg-transparent box">
          <label for="view">View</label>
          <b-container id="view">
            <b-button class="bg-transparent" @click="toggleView" v-b-tooltip.hover.left title="Table View">
              <b-icon icon="grid3x3-gap" aria-hidden="true" :variant="variantTogle"></b-icon>
            </b-button>
            <b-button class="bg-transparent" @click="toggleView" v-b-tooltip.hover.right title="Card View">
              <b-icon icon="images" aria-hidden="true" :variant="variantTogle2"></b-icon>
            </b-button>
          </b-container>
        </b-container>
      </b-row>
    </b-container>

    <b-container fluid id="tableInfo">
      <label for="tableInfo">Filters: </label>
      <b-container>
        <span
          v-if="
            filterTermHero != null ||
              filterTermManaCost != null ||
              filterTermMinionType != null ||
              filterTermName != '' ||
              filterTermRarity != null ||
              filterTermType != null
          "
        >
          Active:
        </span>
        <span v-else>
          <b-badge variant="success" pill>None</b-badge>
        </span>
        <b-badge variant="warning" v-if="filterTermHero != null" pill>
          {{ getClassByid(filterTermHero) }}
        </b-badge>
        <b-badge variant="warning" v-if="filterTermManaCost != null" pill>
          Mana cost: <b>{{ filterTermManaCost }}</b>
        </b-badge>
        <b-badge variant="warning" v-if="filterTermMinionType != null" pill>
          Minion Type: <b>{{ returnType(filterTermMinionType) }}</b></b-badge
        >
        <b-badge variant="warning" v-if="filterTermRarity != null" pill>
          Card Rarity: <b>{{ rarity(filterTermRarity) }}</b></b-badge
        >
        <b-badge variant="warning" v-if="filterTermName != ''" pill>
          Name containing: <b>{{ filterTermName }}</b>
        </b-badge>
        <b-badge variant="warning" v-if="filterTermType != null" pill>
          Card Type: <b>{{ cardType(filterTermType) }}</b>
        </b-badge>
        <hr />
        Minios: <b>{{ totalMinios.length }}</b> Spells: <b>{{ totalSpells.length }}</b> Weapons: <b>{{ totalWeapons.length }}</b> of
        <b>{{ numberOfFilteredCards }} </b>cards.
        <hr />
        Beasts: <b>{{ totalBeasts.length }}</b> | Murlocs: <b>{{ totalMurlocs.length }}</b> | Elementals:
        <b>{{ totalElementals.length }}</b> | Mechs:<b> {{ totalMechs.length }}</b> | Demons: <b>{{ totalDemons.length }}</b> | Pirates:
        <b> {{ totalPirates.length }}</b> | Totems: <b>{{ totalTotems.length }}</b> | Dragons: <b> {{ totalDragons.length }}</b> |
        Quilboars: <b> {{ totalQuilboars.length }}</b> | All types:<b> {{ totalAll.length }}</b>
      </b-container>
      <hr />
    </b-container>
    <b-container fluid v-if="tableView" ref="start">
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
            <b-form-select
              id="per-page-select"
              v-model="perPage"
              :options="pageOptions"
              size="sm"
              :class="isDark ? 'text-white' : 'text-dark'"
              class="bg-transparent"
            ></b-form-select>
          </b-form-group>
        </b-col>
        <b-col>
          <b-button type="button" @click="firstPage" pill class="bg-transparent" :class="isDark ? 'text-white' : 'text-dark'"
            >First</b-button
          >
          <b-button type="button" @click="prevPage" pill class="bg-transparent " :class="isDark ? 'text-white' : 'text-dark'"
            >Previous</b-button
          >
          <b-button type="button" @click="nextPage" pill class="bg-transparent " :class="isDark ? 'text-white' : 'text-dark'"
            >Next</b-button
          >
          <b-button type="button" @click="lastPage" pill class="bg-transparent " :class="isDark ? 'text-white' : 'text-dark'"
            >Last</b-button
          >
        </b-col>
        <b-col>
          <b-dropdown split split-variant="outline-dark" variant="outline-dark" text="Table columns" class="m-2 bg-transparent" size="sm">
            <b-dropdown-form>
              <b-form-checkbox v-model="fields[0].show" @change="thisShouldTriggerRecompute" switch>
                Name
              </b-form-checkbox>
              <b-form-checkbox v-model="fields[1].show" switch disabled>
                Image
              </b-form-checkbox>
              <b-form-checkbox v-model="fields[2].show" @change="thisShouldTriggerRecompute" switch>
                Class
              </b-form-checkbox>
              <b-form-checkbox v-model="fields[3].show" @change="thisShouldTriggerRecompute" switch>
                Classes
              </b-form-checkbox>
              <b-form-checkbox v-model="fields[4].show" @change="thisShouldTriggerRecompute" switch>
                Mana Cost
              </b-form-checkbox>
              <b-form-checkbox v-model="fields[5].show" @change="thisShouldTriggerRecompute" switch>
                Text
              </b-form-checkbox>
              <b-form-checkbox v-model="fields[6].show" @change="thisShouldTriggerRecompute" switch>
                Minion Type
              </b-form-checkbox>
              <b-form-checkbox v-model="fields[7].show" @change="thisShouldTriggerRecompute" switch>
                Type
              </b-form-checkbox>
              <b-form-checkbox v-model="fields[8].show" @change="thisShouldTriggerRecompute" switch>
                Rarity
              </b-form-checkbox>
              <b-form-checkbox v-model="fields[9].show" @change="thisShouldTriggerRecompute" switch>
                Deck
              </b-form-checkbox>
            </b-dropdown-form>
          </b-dropdown>
        </b-col>
      </b-row>
      <b-table
        :fields="computedFields"
        :items="filterType"
        sort-icon-left
        hover
        caption-top
        bordered
        :current-page="currentPage"
        :per-page="perPage"
        @filtered="onFiltered"
        :class="isDark ? 'text-white' : 'text-dark'"
        class="bg-transparent"
      >
        <template #table-caption>
          <span
            v-if="
              filterTermHero != null ||
                filterTermManaCost != null ||
                filterTermMinionType != null ||
                filterTermName != '' ||
                filterTermType != null
            "
            :class="isDark ? 'text-white' : 'text-dark'"
            >Showing only
          </span>
          <span v-else :class="isDark ? 'text-white' : 'text-dark'">Showing all data</span>
          <span v-if="filterTermHero != null" :class="isDark ? 'text-white' : 'text-dark'">
            <b>{{ getClassByid(filterTermHero) }}</b> cards</span
          >
          <span v-if="filterTermManaCost != null" :class="isDark ? 'text-white' : 'text-dark'">
            with Mana cost <b>{{ filterTermManaCost }}</b>
          </span>
          <span v-if="filterTermMinionType != null" :class="isDark ? 'text-white' : 'text-dark'">
            Minion Type <b>{{ returnType(filterTermMinionType) }}</b></span
          >
          <span v-if="filterTermRarity != null" :class="isDark ? 'text-white' : 'text-dark'">
            Rarity <b>{{ rarity(filterTermRarity) }}</b></span
          >
          <span v-if="filterTermName != ''" :class="isDark ? 'text-white' : 'text-dark'">
            Name containing: <b>{{ filterTermName }}</b>
          </span>
          <span v-if="filterTermType != null" :class="isDark ? 'text-white' : 'text-dark'">
            Of type: <b>{{ cardType(filterTermType) }}</b>
          </span>
        </template>
        <template #cell(name)="data">
          <span :class="isDark ? 'text-white' : 'text-dark'">{{ data.value }}</span>
        </template>
        <template #cell(image)="data">
          <b-img-lazy :src="data.value" width="110" height="80" class="zoom" :alt="data.item.name"></b-img-lazy>
        </template>
        <template #cell(classId)="data">
          <span :class="isDark ? 'text-white' : 'text-dark'">{{ data.value }}</span>
        </template>
        <template #cell(multiClassIds)="data">
          <span :class="isDark ? 'text-white' : 'text-dark'">{{ getClassByid(data.value[0]) }} * {{ getClassByid(data.value[1]) }} </span>
        </template>
        <template #cell(manaCost)="data">
          <span :class="isDark ? 'text-white' : 'text-dark'">{{ data.value }}</span>
        </template>
        <template #cell(text)="data">
          <span v-html="data.value" :class="isDark ? 'text-white' : 'text-dark'"></span>
        </template>
        <template #cell(minionTypeId)="data">
          <span :class="isDark ? 'text-white' : 'text-dark'">{{ data.value }}</span>
        </template>
        <template #cell(cardTypeId)="data">
          <span :class="isDark ? 'text-white' : 'text-dark'">{{ data.value }}</span>
        </template>
        <template #cell(rarityId)="data">
          <span :class="isDark ? 'text-white' : 'text-dark'">{{ data.value }}</span>
        </template>
        <template #cell(cardSetId)="data">
          <span :class="isDark ? 'text-white' : 'text-dark'">{{ data.value }}</span>
        </template>
      </b-table>
      <b-row>
        <b-col>
          <br />
          <br />
        </b-col>
      </b-row>
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
            <b-form-select
              id="per-page-select"
              v-model="perPage"
              :options="pageOptions"
              size="sm"
              :class="isDark ? 'text-white' : 'text-dark'"
              class="bg-transparent"
            ></b-form-select>
          </b-form-group>
        </b-col>
        <b-col>
          <b-button type="button" @click="firstPage" pill class="bg-transparent" :class="isDark ? 'text-white' : 'text-dark'"
            >First</b-button
          >
          <b-button type="button" @click="prevPage" pill class="bg-transparent " :class="isDark ? 'text-white' : 'text-dark'"
            >Previous</b-button
          >
          <b-button type="button" @click="nextPage" pill class="bg-transparent " :class="isDark ? 'text-white' : 'text-dark'"
            >Next</b-button
          >
          <b-button type="button" @click="lastPage" pill class="bg-transparent " :class="isDark ? 'text-white' : 'text-dark'"
            >Last</b-button
          >
        </b-col>
      </b-row>
    </b-container>
    <b-container fluid v-else>
      <b-img-lazy v-for="(card, index) in filterType" :key="index" :src="card.image" style="max-width: 12rem;" />
    </b-container>
    <b-container>
      <hr />
    </b-container>
    <b-container>
      <br />
      <br />
      <br />
    </b-container>
  </b-container>
</template>

<script>
import { mapState } from 'vuex';
export default {
  name: 'Arena3',
  data() {
    return {
      //
      tableView: true,
      //
      forceRecomputeCounter: 0,
      filterTermName: '',
      filterTermManaCost: null,
      filterTermHero: null,
      filterTermMinionType: null,
      filterTermRarity: null,
      filterTermType: null,
      typeFilter: null,
      minionTypeFilter: null,
      // bootstrap
      fields: [
        {
          label: 'Name',
          key: 'name',
          sortable: true,
          show: true
        },
        {
          label: 'Image',
          key: 'image',
          show: true
        },
        {
          label: 'Class',
          key: 'classId',
          sortable: true,
          formatter: value => {
            return this.getClassByid(value);
          },
          sortByFormatted: true,
          filterByFormatted: true,
          show: true
        },
        {
          label: 'Classes',
          key: 'multiClassIds',
          sortable: true,
          show: true
          //   formatter: value => {
          //       return this.getClassByid(value)
          //     }
        },
        {
          label: 'Mana Cost',
          key: 'manaCost',
          sortable: true,
          show: true
        },
        {
          label: 'Text',
          key: 'text',
          show: true
        },
        {
          label: 'Minion Type',
          key: 'minionTypeId',
          sortable: true,
          formatter: value => {
            return this.returnType(value);
          },
          sortByFormatted: true,
          filterByFormatted: true,
          show: true
        },
        {
          label: 'Type',
          key: 'cardTypeId',
          sortable: true,
          formatter: value => {
            return this.cardType(value);
          },
          show: true
        },
        {
          label: 'Rarity',
          key: 'rarityId',
          sortable: true,
          formatter: value => {
            return this.rarity(value);
          },
          show: false
        },
        {
          label: 'Deck',
          key: 'cardSetId',
          sortable: true,
          formatter: value => {
            return this.setName(value);
          },
          show: false
        }
      ],
      currentPage: 1,
      perPage: 5,
      pageOptions: [5, 10, 15, 20, 50, { value: 200, text: 'Show a lot' }],
      // end

      selected: null,
      selectedManaCost: null,
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
      emptyCardObject: {
        id: 0,
        classId: '',
        multiClassIds: [],
        cardTypeId: '',
        cardSetId: '',
        rarityId: '',
        artistName: '',
        health: '',
        attack: '',
        manaCost: '',
        name: 'Ooups',
        text: 'The card you are looking for does not exist',
        image: '',
        imageGold: '',
        flavorText: '',
        cropImage: '',
        keywordIds: []
      }
    };
  },
  mounted() {
    // Set the initial number of items
    this.totalRows = this.arenaCards.length;
  },
  created: function() {
    if (window.innerWidth > 1200) {
      this.fields[8].show = true;
      this.fields[9].show = true;
    }
    if (window.innerWidth <= 1200) {
      this.fields[7].show = false;
    }
    if (window.innerWidth <= 992) {
      this.fields[6].show = false;
    }
    if (window.innerWidth <= 768) {
      this.fields[2].show = false;
      this.fields[3].show = false;
    }
    if (window.innerWidth <= 500) {
      this.fields[0].show = false;
      this.fields[4].show = false;
    }
  },
  methods: {
    focusOnTopOfPage() {
      this.$refs.start.scrollIntoView({ behavior: 'smooth', block: 'start', inline: 'start' });
    },
    toggleView() {
      this.tableView = !this.tableView;
    },
    // table paggination
    nextPage() {
      if (this.currentPage * this.perPage < this.arenaCards.length) this.currentPage++;
      this.focusOnTopOfPage();
    },
    prevPage() {
      if (this.currentPage > 1) this.currentPage--;
      this.focusOnTopOfPage();
    },
    firstPage() {
      if (this.currentPage > 1) this.currentPage = 1;
      this.focusOnTopOfPage();
    },
    lastPage() {
      this.currentPage = this.arenaCards.length / this.perPage + 1;
      this.focusOnTopOfPage();
    },
    onFiltered(filteredItems) {
      // Trigger pagination to update the number of buttons/pages due to filtering
      this.totalRows = filteredItems.length;
      this.currentPage = 1;
    },
    // end
    thisShouldTriggerRecompute() {
      this.forceRecomputeCounter++;
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
    setName(id) {
      let x = this.sets.find(set => set.value == id);
      return x.text;
    },
    //
    clearFilterHero() {
      alert('bske');
      this.filterTermHero == null;
    }
  },
  computed: {
    isDark() {
      if (this.theme == 'dark') {
        return true;
      } else return false;
    },
    variantTogle() {
      if (this.tableView) return 'primary';
      else return 'secondary';
    },
    variantTogle2() {
      if (!this.tableView) return 'primary';
      else return 'secondary';
    },

    computedFields() {
      return this.fields.filter(field => field.show != false);
    },
    /// FILTERS
    filterName() {
      this.forceRecomputeCounter;
      if (this.filterTermName == '') {
        return this.arenaCards;
      } else {
        return this.arenaCards.filter(card => card.name.includes(this.filterTermName));
      }
    },
    filterManaCost() {
      this.forceRecomputeCounter;
      if (this.filterTermManaCost == null) {
        return this.filterName;
      } else {
        return this.filterName.filter(card => card.manaCost == this.filterTermManaCost);
      }
    },
    filterHero() {
      this.forceRecomputeCounter;
      if (this.filterTermHero == null) {
        return this.filterManaCost;
      } else {
        return this.filterManaCost.filter(card => card.classId == this.filterTermHero || card.multiClassIds.includes(this.filterTermHero));
      }
    },
    filterMinionType() {
      this.forceRecomputeCounter;
      if (this.filterTermMinionType == null) {
        return this.filterHero;
      } else return this.filterHero.filter(card => card.minionTypeId == this.filterTermMinionType);
    },
    filterRarity() {
      this.forceRecomputeCounter;
      if (this.filterTermRarity == null) {
        return this.filterMinionType;
      } else return this.filterMinionType.filter(card => card.rarityId == this.filterTermRarity);
    },
    filterType() {
      this.forceRecomputeCounter;
      if (this.filterTermType == null) {
        return this.filterRarity;
      } else return this.filterRarity.filter(card => card.cardTypeId == this.filterTermType);
    },

    ///// FILTERS END

    ...mapState({
      cards: state => state.axiosFetch.cards,
      sets: state => state.axiosFetch.sets.filter(set => set.value != 1000),
      heroes: state => state.axiosFetch.heroes,
      minionTypes: state => state.axiosFetch.minionTypes,
      types: state => state.axiosFetch.types.filter(type => type.id != 3 && type.id != 10),
      rarities: state => state.axiosFetch.rarities,
      theme: state => state.theme
    }),
    arenaCards() {
      return this.cards
        .filter(
          card =>
            // card.cardSetId == 13 ||
            // card.cardSetId == 1004 ||
            // card.cardSetId == 1414 ||
            // card.cardSetId == 1443 ||
            // card.cardSetId == 1466 || // madness
            // card.cardSetId == 1525 || // forged
            // card.cardSetId == 1637 // core
            // // witchwood 1125
            // // saviors 1158
            // // united 1578
            // // rumble 1129

            // card.cardSetId == 1466 ||
            // card.cardSetId == 1525 ||
            // card.cardSetId == 1637 ||
            // card.cardSetId == 1125 ||
            // card.cardSetId == 1158 ||
            // card.cardSetId == 1578 ||
            // card.cardSetId == 1129

            card.cardSetId == 1637 || //core
            card.cardSetId == 1578 || //"United in Stormwind"
            card.cardSetId == 1414 || // "Ashes of Outland"
            card.cardSetId == 1130 || // "Rise of Shadows"
            card.cardSetId == 1001 || // "Knights of the Frozen Throne"
            card.cardSetId == 27 || // "Journey to Un’Goro"
            card.cardSetId == 25 // Mean Streets of Gadgetzan
        )
        .sort((a, b) => {
          return a.manaCost - b.manaCost;
        });
    },

    totalSpells() {
      return this.filterType.filter(card => card.cardTypeId == 5);
    },
    totalWeapons() {
      return this.filterType.filter(card => card.cardTypeId == 7);
    },
    totalMinios() {
      return this.filterType.filter(card => card.cardTypeId == 4);
    },
    numberOfFilteredCards() {
      return this.totalMinios.length + this.totalSpells.length + this.totalWeapons.length;
    },
    totalBeasts() {
      return this.filterType.filter(card => card.minionTypeId == 20);
    },
    totalMurlocs() {
      return this.filterType.filter(card => card.minionTypeId == 14);
    },
    totalDemons() {
      return this.filterType.filter(card => card.minionTypeId == 15);
    },
    totalMechs() {
      return this.filterType.filter(card => card.minionTypeId == 17);
    },
    totalElementals() {
      return this.filterType.filter(card => card.minionTypeId == 18);
    },
    totalTotems() {
      return this.filterType.filter(card => card.minionTypeId == 21);
    },
    totalPirates() {
      return this.filterType.filter(card => card.minionTypeId == 23);
    },
    totalDragons() {
      return this.filterType.filter(card => card.minionTypeId == 24);
    },
    totalAll() {
      return this.filterType.filter(card => card.minionTypeId == 26);
    },
    totalQuilboars() {
      return this.filterType.filter(card => card.minionTypeId == 43);
    }
  }
};
</script>

<style scoped>
label {
  padding-right: 0.5em;
}
.zoom:hover {
  transform: scale(3);
}
#pagination {
  background-color: transparent;
}

img {
  max-width: 55px;
}
ul {
  list-style-type: none;
}
ul li {
  display: inline;
  padding: 10px;
}
.maxWidth75 {
  max-width: 75px;
}
.maxWidth100 {
  max-width: 100px;
}
.maxWidth150 {
  max-width: 150px;
}
.box {
  width: 175px;
  height: 80px;
}
</style>
