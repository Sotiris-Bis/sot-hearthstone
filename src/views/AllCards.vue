<template>
  <b-container fluid>
    <b-container fluid>
      <b-row>
        <b-container class="bg-transparent box">
          <label for="filterTermName">{{ $t('Name') }} </label>
          <b-form-input
            type="text"
            v-model="filterTermName"
            id="filterTermName"
            :class="isDark ? 'text-white' : 'text-dark'"
            class="bg-transparent"
            @change="thisShouldTriggerRecompute()"
            tabindex="0"
          />
        </b-container>

        <b-container class="bg-transparent box">
          <label for="filterTermHero">{{ $t('Class') }} </label>
          <b-form-select
            tabindex="0"
            v-model="filterTermHero"
            id="filterTermHero"
            :class="isDark ? 'text-white' : 'text-dark'"
            class="bg-transparent"
            @change="thisShouldTriggerRecompute()"
          >
            <option selected :value="null">{{ $t('Any') }}</option>
            <option v-for="option in heroes" :key="option.id" :value="option.id">
              {{ option.name }}
            </option>
          </b-form-select>
        </b-container>

        <b-container class="bg-transparent box">
          <label for="filterTermManaCost">{{ $t('Mana cost') }}</label>
          <b-form-select
            tabindex="0"
            v-model="filterTermManaCost"
            id="filterTermManaCost"
            :class="isDark ? 'text-white' : 'text-dark'"
            class="bg-transparent"
            @change="thisShouldTriggerRecompute()"
          >
            <option selected :value="null">{{ $t('Any') }}</option>
            <option v-for="option in manaCostOptions" :key="option.id" :value="option.value">
              {{ option.text }}
            </option>
          </b-form-select>
        </b-container>

        <b-container class="bg-transparent box">
          <label for="filterTermMinionType">{{ $t('Minion type') }}</label>
          <b-form-select
            v-model="filterTermMinionType"
            id="filterTermMinionType"
            :class="isDark ? 'text-white' : 'text-dark'"
            class="bg-transparent"
            @change="thisShouldTriggerRecompute()"
            tabindex="0"
          >
            <option selected :value="null">{{ $t('Any') }}</option>
            <option v-for="option in minionTypes" :key="option.id" :value="option.id">
              {{ option.name }}
            </option>
          </b-form-select>
        </b-container>

        <b-container class="bg-transparent box">
          <label for="filterTermRarity">{{ $t('Rarity') }} </label>
          <b-form-select
            tabindex="0"
            v-model="filterTermRarity"
            id="filterTermRarity"
            :class="isDark ? 'text-white' : 'text-dark'"
            class="bg-transparent"
            @change="thisShouldTriggerRecompute()"
          >
            <option selected :value="null">{{ $t('Any') }}</option>
            <option v-for="option in rarities" :key="option.id" :value="option.id">
              {{ option.name }}
            </option>
          </b-form-select>
        </b-container>

        <b-container class="bg-transparent box">
          <label for="filterTermType">{{ $t('Type') }} </label>
          <b-form-select
            tabindex="0"
            v-model="filterTermType"
            id="filterTermType"
            :class="isDark ? 'text-white' : 'text-dark'"
            class="bg-transparent"
            @change="thisShouldTriggerRecompute()"
          >
            <option selected :value="null">{{ $t('Any') }}</option>
            <option v-for="option in types" :key="option.id" :value="option.id">
              {{ option.name }}
            </option>
          </b-form-select>
        </b-container>

        <b-container class="bg-transparent box">
          <label for="filterTermDeck">{{ $t('Deck') }} </label>
          <b-form-select
            tabindex="0"
            v-model="filterTermDeck"
            id="filterTermDeck"
            :class="isDark ? 'text-white' : 'text-dark'"
            class="bg-transparent"
            @change="thisShouldTriggerRecompute()"
          >
            <option selected :value="null">{{ $t('Any') }}</option>
            <option v-for="option in sets" :key="option.id" :value="option.value">
              {{ option.text }}
            </option>
          </b-form-select>
        </b-container>
      </b-row>
    </b-container>
    <b-container fluid id="tableInfo">
      <label for="tableInfo">{{ $t('Filters') }}: </label>
      <div>
        <span
          v-if="
            filterTermHero != null ||
              filterTermManaCost != null ||
              filterTermMinionType != null ||
              filterTermName != '' ||
              filterTermRarity != null ||
              filterTermType != null ||
              filterTermDeck != null
          "
        >
          {{ $t('Active') }} :
        </span>
        <span v-else>
          <b-badge variant="success" pill>{{ $t('None') }}</b-badge>
        </span>
        <b-badge variant="warning" v-if="filterTermHero != null" pill>
          {{ getClassByid(filterTermHero) }}
        </b-badge>
        <b-badge variant="warning" v-if="filterTermManaCost != null" pill>
          {{ $t('Mana cost') }}: <b>{{ filterTermManaCost }}</b>
        </b-badge>
        <b-badge variant="warning" v-if="filterTermMinionType != null" pill>
          {{ $t('Minion type') }}: <b>{{ returnType(filterTermMinionType) }}</b></b-badge
        >
        <b-badge variant="warning" v-if="filterTermRarity != null" pill>
          {{ $t('Rarity') }}: <b>{{ rarity(filterTermRarity) }}</b></b-badge
        >
        <b-badge variant="warning" v-if="filterTermName != ''" pill>
          {{ $t('Name') }}: <b>{{ filterTermName }}</b>
        </b-badge>
        <b-badge variant="warning" v-if="filterTermType != null" pill>
          {{ $t('Type') }}: <b>{{ cardType(filterTermType) }}</b>
        </b-badge>
        <b-badge variant="warning" v-if="filterTermDeck != null" pill>
          {{ $t('Deck') }}: <b>{{ setName(filterTermDeck) }}</b>
        </b-badge>
        <hr />
        {{ $t('Minion') }}: <b>{{ totalMinios.length }}</b> {{ $t('Spell') }}: <b>{{ totalSpells.length }}</b> {{ $t('Weapon') }}:
        <b>{{ totalWeapons.length }}</b> {{ $t('Hero') }}: <b>{{ totalHeroes.length }}</b> of <b>{{ numberOfFilteredCards }} </b>{{ $t('Cards') }}.
        <hr />
        {{ $t('Beast') }}: <b>{{ totalBeasts.length }}</b> | {{ $t('Murloc') }}: <b>{{ totalMurlocs.length }}</b> | {{ $t('Elemental') }}:
        <b>{{ totalElementals.length }}</b> | {{ $t('Mech') }}:<b> {{ totalMechs.length }}</b> | {{ $t('Demon') }}:
        <b>{{ totalDemons.length }}</b> | {{ $t('Pirate') }}: <b> {{ totalPirates.length }}</b> | {{ $t('Totem') }}:
        <b>{{ totalTotems.length }}</b> | {{ $t('Dragon') }}: <b> {{ totalDragons.length }}</b> | {{ $t('Quilboar') }}:
        <b> {{ totalQuilboars.length }}</b> | {{ $t('All') }}:<b> {{ totalAll.length }}</b>
      </div>
      <hr />
    </b-container>
    <b-container fluid ref="start">
      <b-row>
        <b-col sm="5" md="6" class="my-1">
          <b-form-group
            :label="$t('Per page')"
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
          <b-button type="button" size="sm" @click="firstPage" pill class="bg-transparent " :class="isDark ? 'text-white' : 'text-dark'">{{
            $t('First')
          }}</b-button>
          <b-button type="button" size="sm" @click="prevPage" pill class="bg-transparent " :class="isDark ? 'text-white' : 'text-dark'">{{
            $t('Previous')
          }}</b-button>
          <b-button type="button" size="sm" @click="nextPage" pill class="bg-transparent " :class="isDark ? 'text-white' : 'text-dark'">{{
            $t('Next')
          }}</b-button>
          <b-button type="button" size="sm" @click="lastPage" pill class="bg-transparent " :class="isDark ? 'text-white' : 'text-dark'">{{
            $t('Last')
          }}</b-button>
        </b-col>
        <b-col>
          <b-dropdown
            id="asd"
            split
            split-variant="outline-dark"
            variant="outline-dark"
            :text="$t('Table columns')"
            class="m-2 transparent"
            size="sm"
          >
            <b-dropdown-form>
              <b-form-checkbox v-model="fields[0].show" @change="thisShouldTriggerRecompute" switch>
                {{ $t('Name') }}
              </b-form-checkbox>
              <b-form-checkbox v-model="fields[1].show" switch disabled>
                {{ $t('Image') }}
              </b-form-checkbox>
              <b-form-checkbox v-model="fields[2].show" @change="thisShouldTriggerRecompute" switch>
                {{ $t('Class') }}
              </b-form-checkbox>
              <b-form-checkbox v-model="fields[3].show" @change="thisShouldTriggerRecompute" switch>
                {{ $t('Classes') }}
              </b-form-checkbox>
              <b-form-checkbox v-model="fields[4].show" @change="thisShouldTriggerRecompute" switch>
                {{ $t('Mana cost') }}
              </b-form-checkbox>
              <b-form-checkbox v-model="fields[5].show" @change="thisShouldTriggerRecompute" switch>
                {{ $t('Text') }}
              </b-form-checkbox>
              <b-form-checkbox v-model="fields[6].show" @change="thisShouldTriggerRecompute" switch>
                {{ $t('Minion Type') }}
              </b-form-checkbox>
              <b-form-checkbox v-model="fields[7].show" @change="thisShouldTriggerRecompute" switch>
                {{ $t('Type') }}
              </b-form-checkbox>
              <b-form-checkbox v-model="fields[8].show" @change="thisShouldTriggerRecompute" switch>
                {{ $t('Rarity') }}
              </b-form-checkbox>

              <b-form-checkbox v-model="fields[9].show" @change="thisShouldTriggerRecompute" switch>
                Id
              </b-form-checkbox>
              <b-form-checkbox v-model="fields[10].show" @change="thisShouldTriggerRecompute" switch>
                {{ $t('Deck') }}
              </b-form-checkbox>
            </b-dropdown-form>
          </b-dropdown>
        </b-col>
      </b-row>
      <b-table
        :fields="computedFields"
        :items="filterDeck"
        sort-icon-left
        hover
        caption-top
        bordered
        :current-page="currentPage"
        :per-page="perPage"
        @filtered="onFiltered"
        :class="isDark ? 'text-white' : 'text-dark'"
        class="bg-transparent"
        ref="start"
      >
        <template #table-caption>
          <span
            v-if="
              filterTermHero != null ||
                filterTermManaCost != null ||
                filterTermMinionType != null ||
                filterTermName != '' ||
                filterTermType != null ||
                filterTermDeck != null
            "
            :class="isDark ? 'text-white' : 'text-dark'"
            >{{ $t('Active') }} {{ $t('filters') }} :
          </span>
          <span v-else>
            <b-badge variant="success" pill>{{ $t('All') }} {{ $t('cards') }}</b-badge>
          </span>
          <b-badge variant="warning" v-if="filterTermHero != null" pill>
            {{ getClassByid(filterTermHero) }}
          </b-badge>
          <b-badge variant="warning" v-if="filterTermManaCost != null" pill>
            {{ $t('Mana cost') }}: <b>{{ filterTermManaCost }}</b>
          </b-badge>
          <b-badge variant="warning" v-if="filterTermMinionType != null" pill>
            {{ $t('Minion type') }}: <b>{{ returnType(filterTermMinionType) }}</b></b-badge
          >
          <b-badge variant="warning" v-if="filterTermRarity != null" pill>
            {{ $t('Rarity') }}: <b>{{ rarity(filterTermRarity) }}</b></b-badge
          >
          <b-badge variant="warning" v-if="filterTermName != ''" pill>
            {{ $t('Name') }}: <b>{{ filterTermName }}</b>
          </b-badge>
          <b-badge variant="warning" v-if="filterTermType != null" pill>
            {{ $t('Type') }}: <b>{{ cardType(filterTermType) }}</b>
          </b-badge>
          <b-badge variant="warning" v-if="filterTermDeck != null" pill>
            {{ $t('Deck') }}: <b>{{ setName(filterTermDeck) }}</b>
          </b-badge>
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
        <template #cell(id)="data">
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
          <b-button type="button" size="sm" @click="firstPage" pill class="bg-transparent" :class="isDark ? 'text-white' : 'text-dark'">{{
            $t('First')
          }}</b-button>
          <b-button type="button" size="sm" @click="prevPage" pill class="bg-transparent " :class="isDark ? 'text-white' : 'text-dark'">{{
            $t('Previous')
          }}</b-button>
          <b-button type="button" size="sm" @click="nextPage" pill class="bg-transparent " :class="isDark ? 'text-white' : 'text-dark'">{{
            $t('Next')
          }}</b-button>
          <b-button type="button" size="sm" @click="lastPage" pill class="bg-transparent " :class="isDark ? 'text-white' : 'text-dark'">{{
            $t('Last')
          }}</b-button>
        </b-col>
      </b-row>
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
  name: 'AllCards',
  data() {
    return {
      forceRecomputeCounter: 0,
      filterTermName: '',
      filterTermManaCost: null,
      filterTermHero: null,
      filterTermMinionType: null,
      filterTermRarity: null,
      filterTermType: null,
      filterTermDeck: null,
      typeFilter: null,
      minionTypeFilter: null,
      // bootstrap
      fields: [
        {
          label: 'Name',
          key: 'name',
          sortable: true,
          show: true
          // 0
        },
        {
          label: 'Image',
          key: 'image',
          show: true
          // 1
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
          // 2
        },
        {
          label: 'Classes',
          key: 'multiClassIds',
          sortable: true,
          //   formatter: value => {
          //       return this.getClassByid(value)
          //     },
          show: true
          // 3
        },
        {
          label: 'Mana Cost',
          key: 'manaCost',
          sortable: true,
          show: true
          // 4
        },
        {
          label: 'Text',
          key: 'text',
          show: true
          // 5
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
          // 6
        },
        {
          label: 'Type',
          key: 'cardTypeId',
          sortable: true,
          formatter: value => {
            return this.cardType(value);
          },
          show: true
          // 7
        },
        {
          label: 'Rarity',
          key: 'rarityId',
          sortable: true,
          formatter: value => {
            return this.rarity(value);
          },
          show: true
          // 8
        },
        {
          label: 'Id',
          key: 'id',
          show: false
          // 9
        },
        {
          label: 'Deck',
          key: 'cardSetId',
          sortable: true,
          formatter: value => {
            return this.setName(value);
          },
          show: false
          // 10
        }
      ],
      currentPage: 1,
      perPage: 10,
      pageOptions: [10, 20, 50, 100],
      // end

      selected: null,
      selectedManaCost: null,
      manaCostOptions: [
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
  created: function() {
    if (window.innerWidth > 1200) {
      this.fields[9].show = true;
      this.fields[10].show = true;
    }
    if (window.innerWidth <= 1200) {
      this.fields[8].show = false;
    }
    if (window.innerWidth <= 992) {
      this.fields[7].show = false;
    }
    if (window.innerWidth <= 768) {
      this.fields[2].show = false;
      this.fields[3].show = false;
    }
    if (window.innerWidth <= 500) {
      this.fields[0].show = false;
      this.fields[6].show = false;
    }
  },
  mounted() {
    // Set the initial number of items
    this.totalRows = this.arenaCards.length;
  },
  methods: {
    focusOnTopOfPage() {
      this.$refs.start.scrollIntoView({ behavior: 'smooth', block: 'start', inline: 'start' });
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
          return this.$t('Common');
        case 2:
          return this.$t('Free');
        case 3:
          return this.$t('Rare');
        case 4:
          return this.$t('Epic');
        case 5:
          return this.$t('Legendary');
      }
    },
    getClassByid(id) {
      switch (id) {
        case 2:
          return this.$t('Druid');
        case 3:
          return this.$t('Hunter');

        case 4:
          return this.$t('Mage');

        case 5:
          return this.$t('Paladin');

        case 6:
          return this.$t('Priest');

        case 7:
          return this.$t('Rogue');

        case 8:
          return this.$t('Shaman');

        case 9:
          return this.$t('Warlock');

        case 10:
          return this.$t('Warrior');
        case 12:
          return this.$t('Neutral');
        case 14:
          return this.$t('Demonhunter');
        case 26:
          return this.$t('All');
        default:
          return '';
      }
    },
    returnType(number) {
      switch (number) {
        case 14:
          return this.$t('Murloc');
        case 15:
          return this.$t('Demon');

        case 17:
          return this.$t('Mech');

        case 18:
          return this.$t('Elemental');

        case 20:
          return this.$t('Beast');

        case 21:
          return this.$t('Totem');

        case 23:
          return this.$t('Pirate');

        case 24:
          return this.$t('Dragon');

        case 26:
          return this.$t('All');
        case 43:
          return this.$t('Quilboar');
        default:
          return '';
      }
    },
    cardType(number) {
      switch (number) {
        case 4:
          return this.$t('Minion');
        case 5:
          return this.$t('Spell');

        case 3:
          return this.$t('Hero');

        case 7:
          return this.$t('Weapon');
        default:
          return '';
      }
    },
    setName(id) {
      let x = this.sets.find(set => set.value == id);
      if (x) {
        return x.text;
      } else return;
    }
    //
  },
  computed: {
    isDark() {
      if (this.theme == 'dark') {
        return true;
      } else return false;
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
    filterDeck() {
      this.forceRecomputeCounter;
      if (this.filterTermDeck == null) {
        return this.filterType;
      } else if (this.filterTermDeck == 1000) {
        return this.filterType.filter(
          card =>
            card.cardSetId == '1637' || // core
            card.cardSetId == '1466' || // Darkmoon
            card.cardSetId == '1443' || // Scholomance
            card.cardSetId == '1414' ||   // outland
            card.cardSetId == '1525' ||  //Barrens
            card.cardSetId == '1578' || // Stormwind
            card.cardSetId == '1626'  //Alterac Valley
        );
      } else return this.filterType.filter(card => card.cardSetId == this.filterTermDeck);
    },

    ///// FILTERS END
    computedFields() {
      this.forceRecomputeCounter;
      return this.fields.filter(field => field.show == true);
    },
    ...mapState({
      cards: state => state.axiosFetch.cards,
      sets: state => state.axiosFetch.sets,
      heroes: state => state.axiosFetch.heroes,
      minionTypes: state => state.axiosFetch.minionTypes,
      types: state => state.axiosFetch.types.filter(type => type.id != 10),
      rarities: state => state.axiosFetch.rarities,
      theme: state => state.theme
    }),
    arenaCards() {
      return this.cards
        .filter(card => card.cardSetId != 'lol')
        .sort((a, b) => {
          return a.manaCost - b.manaCost;
        });
    },
    totalSpells() {
      return this.filterDeck.filter(card => card.cardTypeId == 5);
    },
    totalWeapons() {
      return this.filterDeck.filter(card => card.cardTypeId == 7);
    },
    totalMinios() {
      return this.filterDeck.filter(card => card.cardTypeId == 4);
    },
    totalHeroes() {
      return this.filterDeck.filter(card => card.cardTypeId == 3);
    },
    numberOfFilteredCards() {
      return this.filterDeck.length;
    },
    totalBeasts() {
      return this.filterDeck.filter(card => card.minionTypeId == 20);
    },
    totalMurlocs() {
      return this.filterDeck.filter(card => card.minionTypeId == 14);
    },
    totalDemons() {
      return this.filterDeck.filter(card => card.minionTypeId == 15);
    },
    totalMechs() {
      return this.filterDeck.filter(card => card.minionTypeId == 17);
    },
    totalElementals() {
      return this.filterDeck.filter(card => card.minionTypeId == 18);
    },
    totalTotems() {
      return this.filterDeck.filter(card => card.minionTypeId == 21);
    },
    totalPirates() {
      return this.filterDeck.filter(card => card.minionTypeId == 23);
    },
    totalDragons() {
      return this.filterDeck.filter(card => card.minionTypeId == 24);
    },
    totalAll() {
      return this.filterDeck.filter(card => card.minionTypeId == 26);
    },
    totalQuilboars() {
      return this.filterDeck.filter(card => card.minionTypeId == 43);
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
