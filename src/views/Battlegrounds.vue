<template>
  <b-container fluid>
    <b-card no-body class="bg-transparent">
      <b-tabs vertical active-nav-item-class="font-weight-bold bg-transparent" >
        <b-tab title="Minions" active>
          <b-card-text>
            <b-container fluid id="filterSection">
              <label for="filterSection" :class="isDark ? 'text-white' : 'text-dark'">Filters</label>
              <b-list-group horizontal="lg">
                <b-list-group-item class="bg-transparent">
                  <label for="filterTermName" :class="isDark ? 'text-white' : 'text-dark'">Name </label>
                  <b-input
                    type="text"
                    v-model="filterTermName"
                    id="filterTermName"
                    class="bg-transparent"
                    :class="isDark ? 'text-white' : 'text-dark'"
                    @change="thisShouldTriggerRecompute()"
                    tabindex="0"
                  />
                </b-list-group-item>
                <b-list-group-item class="transparent">
                  <label for="filterTermMinionType" :class="isDark ? 'text-white' : 'text-dark'">Minion type </label>
                  <b-select
                    v-model="filterTermMinionType"
                    id="filterTermMinionType"
                    class="bg-transparent"
                    :class="isDark ? 'text-white' : 'text-dark'"
                    @change="thisShouldTriggerRecompute()"
                    tabindex="0"
                  >
                    <option selected :value="0">Any</option>
                    <option :value="null">No Type</option>
                    <option v-for="option in minionTypes" :key="option.id" :value="option.id">
                      {{ option.name }}
                    </option>
                  </b-select>
                </b-list-group-item>
                <b-list-group-item class="bg-transparent">
                  <label for="filterTermTier">Tier</label>
                  <b-select
                    v-model="filterTermTier"
                    id="filterTermTier"
                    class="bg-transparent"
                    :class="isDark ? 'text-white' : 'text-dark'"
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
                  </b-select>
                </b-list-group-item>
                <b-list-group-item class="transparent">
                  <label for="view">Toggle view</label>
                  <div id="view">
                    <b-button class="bg-transparent" @click="toggleView" v-b-tooltip.hover title="Table View">
                      <b-icon icon="grid3x3-gap" aria-hidden="true" :variant="variantTogle"></b-icon>
                    </b-button>
                    <b-button class="bg-transparent" @click="toggleView" v-b-tooltip.hover title="Card View">
                      <b-icon icon="images" aria-hidden="true" :variant="variantTogle2"></b-icon>
                    </b-button>
                  </div>
                </b-list-group-item>
              </b-list-group>
            </b-container>
            <b-container fluid id="tableInfo">
              <label for="tableInfo">Filters: </label>
              <div>
                <span v-if="filterTermMinionType != 0 || filterTermName != '' || filterTermTier != null" :class="isDark ? 'text-white' : 'text-dark'">
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
            <b-container fluid v-if="tableView">
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
                  <b-button @click="firstPage" pill class="bg-transparent" :class="isDark ? 'text-white' : 'text-dark'">First</b-button>
                  <b-button @click="prevPage" pill class="bg-transparent" :class="isDark ? 'text-white' : 'text-dark'">Previous</b-button>
                  <b-button @click="nextPage" pill class="bg-transparent" :class="isDark ? 'text-white' : 'text-dark'">Next</b-button>
                  <b-button @click="lastPage" pill class="bg-transparent" :class="isDark ? 'text-white' : 'text-dark'">Last</b-button>
                </b-col>
                <b-col>
                  <b-dropdown
                    id="asd"
                    split
                    split-variant="outline-dark"
                    variant="outline-dark"
                    text="Table columns"
                    class="bg-transparent"
                    :class="isDark ? 'text-white' : 'text-dark'"
                    size="sm"
                  >
                    <b-dropdown-form  class="bg-transparent">
                      <b-form-checkbox v-model="fields[0].show" @change="thisShouldTriggerRecompute" switch>
                        Name
                      </b-form-checkbox>
                      <b-form-checkbox v-model="fields[1].show" switch disabled>
                        Image
                      </b-form-checkbox>
                      <b-form-checkbox v-model="fields[2].show" @change="thisShouldTriggerRecompute" switch>
                        Text
                      </b-form-checkbox>
                      <b-form-checkbox v-model="fields[3].show" @change="thisShouldTriggerRecompute" switch>
                        Type
                      </b-form-checkbox>
                      <b-form-checkbox v-model="fields[4].show" @change="thisShouldTriggerRecompute" switch>
                        Tier
                      </b-form-checkbox>
                    </b-dropdown-form>
                  </b-dropdown>
                </b-col>
              </b-row>
              <b-table
                :fields="computedFields"
                :items="filterTier"
                sort-icon-left
                hover
                caption-top
                bordered
                :current-page="currentPage"
                :per-page="perPage"
                @filtered="onFiltered"
                class="bg-transparent"
                :class="isDark ? 'text-white' : 'text-dark'"
              >
                <template #table-caption >
                  <span v-if="filterTermHero != null || filterTermMinionType != null || filterTermName != ''" :class="isDark ? 'text-white' : 'text-dark'">Showing only </span>
                  <span v-else :class="isDark ? 'text-white' : 'text-dark'">Showing all data</span>
                  <span v-if="filterTermHero != null" :class="isDark ? 'text-white' : 'text-dark'">
                    <b>{{ getClassByid(filterTermHero) }}</b> cards</span
                  >
                  <span v-if="filterTermMinionType != null" :class="isDark ? 'text-white' : 'text-dark'">
                    Minion Type <b>{{ returnType(filterTermMinionType) }}</b></span
                  >

                  <span v-if="filterTermName != ''" :class="isDark ? 'text-white' : 'text-dark'">
                    Name containing: <b>{{ filterTermName }}</b>
                  </span>
                </template>
                <template #cell(name)="data">
                  <span :class="isDark ? 'text-white' : 'text-dark'">{{ data.value }}</span>
                </template>
                <template #cell(battlegrounds)="data">
                  <b-img-lazy :src="data.value.image" width="150px" class="zoom" alt="null"></b-img-lazy>
                </template>

                <template #cell(text)="data">
                  <span v-html="data.value" :class="isDark ? 'text-white' : 'text-dark'"></span>
                </template>
                <template #cell(minionTypeId)="data" >
                  <span :class="isDark ? 'text-white' : 'text-dark'">{{ data.value }}</span>
                </template>
                <template #cell(tier)="data" >
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
                      class="bg-transparent"
                    ></b-form-select>
                  </b-form-group>
                </b-col>
                <b-col>
                  <b-button @click="firstPage" pill class="bg-transparent" :class="isDark ? 'text-white' : 'text-dark'">First</b-button>
                  <b-button @click="prevPage" pill class="bg-transparent" :class="isDark ? 'text-white' : 'text-dark'">Previous</b-button>
                  <b-button @click="nextPage" pill class="bg-transparent" :class="isDark ? 'text-white' : 'text-dark'">Next</b-button>
                  <b-button @click="lastPage" pill class="bg-transparent" :class="isDark ? 'text-white' : 'text-dark'">Last</b-button>
                </b-col>
              </b-row>
            </b-container>
            <b-container v-else>
              <b-img v-for="(card, index) in filterTier" :key="index" :src="card.battlegrounds.image" style="max-width: 12rem;" />
            </b-container>
          </b-card-text>
        </b-tab>
        <b-tab title="Heroes" lazy>
          <b-card-text>
            <b-container>
              <div>
                <b-card-group deck>
                  <b-card no-body style="min-width: 40%;" class="bg-transparent" v-for="hero in heroes" :key="hero.id">
                    <b-row no-gutters class="index">
                      <b-col md="6">
                        <b-card-img
                          :src="hero.battlegrounds.image"
                          style="min-width: 25%;"
                          :alt="hero.name"
                          class="rounded-0 "
                        ></b-card-img>
                      </b-col>
                      <b-col md="6">
                        <b-card-body :title="hero.name"> </b-card-body>
                      </b-col>
                    </b-row>
                  </b-card>
                </b-card-group>
              </div>
              <br />
            </b-container>
          </b-card-text>
        </b-tab>
      </b-tabs>
    </b-card>
    <b-row>
     <br />
     <br />
    </b-row>
  </b-container>
</template>

<script>
import { mapState } from 'vuex';
export default {
  name: 'Battlegrounds',
  data() {
    return {
      //
      tableView: true,
      //
      forceRecomputeCounter: 0,
      filterTermName: '',
      bake: true,
      filterTermHero: null,
      filterTermMinionType: 0,
      filterTermTier: null,
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
          key: 'battlegrounds',
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
          label: 'Tier',
          key: 'battlegrounds.tier',
          sortable: true,
          show: true
        }
      ],
      currentPage: 1,
      perPage: 5,
      pageOptions: [5, 10, 15, 20, 50, 200],
      // end
      fieldOptions: [
        {
          text: 'Text',
          value: 'text',
          show: true
        },
        {
          text: 'Minion Type',
          value: 'minionType',
          show: true
        },
        {
          text: 'Tier',
          value: 'tier',
          show: true
        }
      ],
      selected: null
    };
  },

  mounted() {
    // Set the initial number of items
    this.totalRows = this.cards.length;
  },
  methods: {
    toggleView() {
      this.tableView = !this.tableView;
    },

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
      heroes: state => state.axiosFetch.battlegroundHeroes,
      minionTypes: state => state.axiosFetch.minionTypes,
      theme: state => state.theme
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
  z-index: 1;
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
table img {
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
.index {
  z-index: 0;
}
.out {
  position: absolute;
  top: 100px;
  left: -100px;
}
</style>
