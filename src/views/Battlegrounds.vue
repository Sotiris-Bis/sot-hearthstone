<template>
  <b-container fluid>
    <b-card no-body class="transparent">
      <b-tabs vertical active-nav-item-class="font-weight-bold bg-transparent">
        <b-tab title="Minions" active
          ><b-card-text>
            <b-container fluid id="filterSection">
              <label for="filterSection">The filter section</label>
              <b-list-group horizontal="lg">
                <b-list-group-item class="transparent">
                  <label for="filterTermName">Name </label>
                  <input
                    type="text"
                    v-model="filterTermName"
                    id="filterTermName"
                    class="select transparent"
                    @change="thisShouldTriggerRecompute()"
                    tabindex="0"
                  />
                </b-list-group-item>
                <b-list-group-item class="transparent">
                  <label for="filterTermMinionType">Minion type </label>
                  <select
                    v-model="filterTermMinionType"
                    id="filterTermMinionType"
                    class="select transparent"
                    @change="thisShouldTriggerRecompute()"
                    tabindex="0"
                  >
                    <option selected :value="0">Any</option>
                    <option :value="null">No Type</option>
                    <option v-for="option in minionTypes" :key="option.id" :value="option.id">
                      {{ option.name }}
                    </option>
                  </select>
                </b-list-group-item>
                <b-list-group-item class="transparent">
                  <label for="filterTermTier">Tier</label>
                  <select
                    v-model="filterTermTier"
                    id="filterTermTier"
                    class="select transparent"
                    @change="thisShouldTriggerRecompute()"
                    tabindex="0"
                  >
                    <option selected :value="null">Any</option>
                    <option value="1">Tier 1</option>
                    <option value="2">Tier 2</option>
                    <option value="3">Tier 3</option>
                    <option value="4">Tier 4</option>
                    <option value="5">Tier 5</option>
                    <option value="6">Tier 6</option>
                  </select>
                </b-list-group-item>
              </b-list-group>
            </b-container>
            <b-container fluid id="tableInfo">
              <label for="tableInfo">Filters: </label>
              <div>
                <span v-if="filterTermMinionType != 0 || filterTermName != '' || filterTermTier != null">
                  Active:
                </span>
                <span v-else>
                  <b-badge variant="success" pill>None</b-badge>
                </span>

                <b-badge variant="warning" v-if="filterTermTier != null" pill>
                  <b>Tier: {{ filterTermTier }}</b>
                </b-badge>
                <b-badge variant="warning" v-if="filterTermMinionType != 0" pill>
                  Minion Type: <b>{{ returnType(filterTermMinionType) }}</b></b-badge
                >

                <b-badge variant="warning" v-if="filterTermName != ''" pill>
                  Name containing: <b>{{ filterTermName }}</b>
                </b-badge>

                <hr />
                Beasts: <b>{{ totalBeasts.length }}</b> | Murlocs: <b>{{ totalMurlocs.length }}</b> | Elementals:
                <b>{{ totalElementals.length }}</b> | Mechs:<b> {{ totalMechs.length }}</b> | Demons: <b>{{ totalDemons.length }}</b> |
                Pirates: <b> {{ totalPirates.length }}</b> | Dragons: <b> {{ totalDragons.length }}</b> | Quilboars:
                <b> {{ totalQuilboars.length }}</b> | No Minion Type: <b>{{ totalNoMinionType.length }}</b> | All types:<b>
                  {{ totalAll.length }}</b
                >
              </div>
              <hr />
            </b-container>
            <b-container fluid>
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
                      class="bg-transparent text-primary"
                    ></b-form-select>
                  </b-form-group>
                </b-col>
                <b-col>
                  <b-button @click="firstPage" pill class="bg-transparent text-primary">First</b-button>
                  <b-button @click="prevPage" pill class="bg-transparent text-primary">Previous</b-button>
                  <b-button @click="nextPage" pill class="bg-transparent text-primary">Next</b-button>
                  <b-button @click="lastPage" pill class="bg-transparent text-primary">Last</b-button>
                </b-col>
              </b-row>
              <b-table
                :fields="fields"
                :items="filterTier"
                sort-icon-left
                hover
                caption-top
                bordered
                :current-page="currentPage"
                :per-page="perPage"
                @filtered="onFiltered"
                class="bg-transparent text-primary"
              >
                <template #table-caption>
                  <span v-if="filterTermHero != null || filterTermMinionType != null || filterTermName != ''">Showing only </span>
                  <span v-else>Showing all data</span>
                  <span v-if="filterTermHero != null">
                    <b>{{ getClassByid(filterTermHero) }}</b> cards</span
                  >
                  <span v-if="filterTermMinionType != null">
                    Minion Type <b>{{ returnType(filterTermMinionType) }}</b></span
                  >

                  <span v-if="filterTermName != ''">
                    Name containing: <b>{{ filterTermName }}</b>
                  </span>
                </template>
                <template #cell(name)="data">
                  <span>{{ data.value }}</span>
                </template>
                <template #cell(image)="data">
                  <b-img-lazy :src="data.value" width="110" height="80" class="zoom" alt="null"></b-img-lazy>
                </template>

                <template #cell(text)="data">
                  <span v-html="data.value"></span>
                </template>
                <template #cell(minionTypeId)="data" class="text-primary">
                  <span>{{ data.value }}</span>
                </template>
                <template #cell(tier)="data" class="text-primary">
                  <span>{{ data.value }}</span>
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
                      class="bg-transparent text-primary"
                    ></b-form-select>
                  </b-form-group>
                </b-col>
                <b-col>
                  <b-button @click="firstPage" pill class="bg-transparent text-primary">First</b-button>
                  <b-button @click="prevPage" pill class="bg-transparent text-primary">Previous</b-button>
                  <b-button @click="nextPage" pill class="bg-transparent text-primary">Next</b-button>
                  <b-button @click="lastPage" pill class="bg-transparent text-primary">Last</b-button>
                </b-col>
              </b-row>
            </b-container>
          </b-card-text>
        </b-tab>
        <b-tab title="Heroes" lazy>
          <b-card-text>
            <b-container>
              <div>
                <b-card-group deck>
                  <b-card no-body style="min-width: 40%;" class="bg-transparent" v-for="hero in heroes" :key="hero.id">
                    <b-row no-gutters>
                      <b-col md="6">
                        <b-card-img
                          :src="hero.battlegrounds.image"
                          style="min-width: 25%;"
                          :alt="hero.name"
                          class="rounded-0 zoom"
                        ></b-card-img>
                      </b-col>
                      <b-col md="6">
                        <b-card-body :title="hero.name"> </b-card-body>
                      </b-col>
                    </b-row>
                  </b-card>
                </b-card-group>
              </div>
              <!-- <div v-for="hero in heroes" :key="hero.id">
              <b-img-lazy  :src="hero.battlegrounds.image" width="150" height="100" class="zoom" :alt="hero.name"></b-img-lazy>
              <span>{{hero.name}}</span>
            </div> -->
              <br />
            </b-container>
          </b-card-text>
        </b-tab>
      </b-tabs>
    </b-card>
  </b-container>
</template>

<script>
import { mapState } from 'vuex';
export default {
  name: 'Battlegrounds',
  data() {
    return {
      forceRecomputeCounter: 0,
      filterTermName: '',

      filterTermHero: null,
      filterTermMinionType: 0,
      filterTermTier: null,
      minionTypeFilter: null,
      // bootstrap
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
          label: 'Tier',
          key: 'battlegrounds.tier',
          sortable: true
        }
      ],
      currentPage: 1,
      perPage: 5,
      pageOptions: [5, 10, 15, 20, 50, 200],
      // end

      selected: null
    };
  },
  mounted() {
    // Set the initial number of items
    this.totalRows = this.cards.length;
  },
  methods: {
    // table paggination
    nextPage() {
      if (this.currentPage * this.perPage < this.cards.length) this.currentPage++;
    },
    prevPage() {
      if (this.currentPage > 1) this.currentPage--;
    },
    firstPage() {
      if (this.currentPage > 1) this.currentPage = 1;
    },
    lastPage() {
      this.currentPage = this.cards.length / this.perPage + 1;
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

    returnType(number) {
      switch (number) {
        case null:
          return 'No Type';
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
    }

    //
  },
  computed: {
    /// FILTERS
    filterName() {
      this.forceRecomputeCounter;
      if (this.filterTermName == '') {
        return this.cards;
      } else {
        return this.cards.filter(card => card.name.includes(this.filterTermName));
      }
    },
    filterMinionType() {
      this.forceRecomputeCounter;
      if (this.filterTermMinionType == 0) {
        return this.filterName;
      } else return this.filterName.filter(card => card.minionTypeId == this.filterTermMinionType);
    },
    filterTier() {
      this.forceRecomputeCounter;
      if (this.filterTermTier == null) {
        return this.filterMinionType;
      } else return this.filterMinionType.filter(card => card.battlegrounds.tier == this.filterTermTier);
    },

    ///// FILTERS END

    ...mapState({
      cards: state =>
        state.axiosFetch.battleCards.sort((a, b) => {
          return a.battlegrounds.tier - b.battlegrounds.tier;
        }),
      sets: state => state.axiosFetch.sets,
      heroes: state => state.axiosFetch.battlegroundHeroes,
      minionTypes: state => state.axiosFetch.minionTypes,
      rarities: state => state.axiosFetch.rarities
    }),

    totalSpells() {
      return this.cards.filter(card => card.cardTypeId == 5);
    },
    totalWeapons() {
      return this.cards.filter(card => card.cardTypeId == 7);
    },
    totalMinios() {
      return this.cards.filter(card => card.cardTypeId == 4);
    },
    numberOfFilteredCards() {
      return this.totalMinios.length + this.totalSpells.length + this.totalWeapons.length;
    },
    totalBeasts() {
      return this.cards.filter(card => card.minionTypeId == 20);
    },
    totalMurlocs() {
      return this.cards.filter(card => card.minionTypeId == 14);
    },
    totalDemons() {
      return this.cards.filter(card => card.minionTypeId == 15);
    },
    totalMechs() {
      return this.cards.filter(card => card.minionTypeId == 17);
    },
    totalElementals() {
      return this.cards.filter(card => card.minionTypeId == 18);
    },
    totalNoMinionType() {
      return this.cards.filter(card => card.minionTypeId == null);
    },
    totalPirates() {
      return this.cards.filter(card => card.minionTypeId == 23);
    },
    totalDragons() {
      return this.cards.filter(card => card.minionTypeId == 24);
    },
    totalAll() {
      return this.cards.filter(card => card.minionTypeId == 26);
    },
    totalQuilboars() {
      return this.cards.filter(card => card.minionTypeId == 43);
    }
  }
};
</script>

<style scoped>
label {
  padding-right: 0.5em;
}
.zoom:hover {
  transform: scale(2.5);
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

table {
  border-collapse: collapse;
}
td,
th {
  border: 1px solid #999;
  padding: 0.5rem;
  vertical-align: middle;
}
img {
  max-width: 45%;
}
ul {
  list-style-type: none;
}
ul li {
  display: inline;
  padding: 10px;
}
.width80 {
  overflow-x: scroll;
}
.one {
  max-width: 40px;
}
.two {
  max-width: 90px;
}
.three {
  max-width: 1200px;
}
.padding {
  padding-right: 15px;
  padding-left: 15px;
}
</style>
