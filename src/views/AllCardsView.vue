<template>
  <div>
    <b-tabs pills vertical active-nav-item-class="font-weight-bold bg-transparent">
      <b-tab title="Neutral" active>
        <Neutral />
      </b-tab>

      <b-tab :title="$t('Demonhunter')" lazy>
        <Demonhunter />
      </b-tab>
      <b-tab :title="$t('Druid')" lazy>
        <Druid />
      </b-tab>
      <b-tab :title="$t('Hunter')" lazy>
        <Hunter />
      </b-tab>

      <b-tab :title="$t('Mage')" lazy>
        <Mage />
      </b-tab>

      <b-tab :title="$t('Paladin')" lazy>
        <Paladin />
      </b-tab>
      <b-tab :title="$t('Priest')" lazy>
        <Priest />
      </b-tab>
      <b-tab :title="$t('Rogue')" lazy>
        <Rogue />
      </b-tab>
      <b-tab :title="$t('Shaman')" lazy>
        <Shaman />
      </b-tab>
      <b-tab :title="$t('Warlock')" lazy>
        <Warlock />
      </b-tab>
      <b-tab :title="$t('Warrior')" lazy>
        <Warrior />
      </b-tab>
    </b-tabs>
  </div>
  <!--  <div class="container">
    <div class="container">
      <b-input-group>
        <b-button size="lg" switch :pressed.sync="demonhunter" class="bg-transparent">
          <span> Demonhunter </span>
        </b-button>
        <b-button size="lg" switch :pressed.sync="druid" class="bg-transparent">
          <span> Druid </span>
        </b-button>
        <b-button size="lg" switch :pressed.sync="hunter" class="bg-transparent">
          <span> Hunter </span>
        </b-button>
        <b-button size="lg" switch :pressed.sync="mage" class="bg-transparent">
          <span> Mage </span>
        </b-button>
        <b-button size="lg" switch :pressed.sync="neutral" class="bg-transparent">
          <span> Neutral </span>
        </b-button>
        <b-button size="lg" switch :pressed.sync="paladin" class="bg-transparent">
          <span> Paladin </span>
        </b-button>
        <b-button size="lg" switch :pressed.sync="priest" class="bg-transparent">
          <span> Priest </span>
        </b-button>
        <b-button size="lg" switch :pressed.sync="rogue" class="bg-transparent">
          <span> Rogue </span>
        </b-button>
        <b-button size="lg" switch :pressed.sync="shaman" class="bg-transparent">
          <span> Shaman </span>
        </b-button>
        <b-button size="lg" switch :pressed.sync="warrior" class="bg-transparent">
          <span> Warrior </span>
        </b-button>
        <b-button size="lg" switch :pressed.sync="warlock" class="bg-transparent">
          <span> Warlock </span>
        </b-button>
      </b-input-group>
    </div>
    <transition name="fade">
      <div class="container">
        <Mage v-if="mage" />
        <Demonhunter v-if="demonhunter" />
        <Hunter v-if="hunter" />
        <Druid v-if="druid" />
        <Priest v-if="priest" />
        <Shaman v-if="shaman" />
        <Warrior v-if="warrior" />
        <Neutral v-if="neutral" />
        <Paladin v-if="paladin" />
        <Rogue v-if="rogue" />
        <Warlock v-if="warlock" />
      </div>
    </transition>
  </div> -->
</template>

<script>
import Mage from '../components/Heroes/Mage.vue';
import Demonhunter from '../components/Heroes/Demonhunter.vue';
import Hunter from '../components/Heroes/Hunter.vue';
import Druid from '../components/Heroes/Druid.vue';
import Paladin from '../components/Heroes/Paladin.vue';
import Priest from '../components/Heroes/Priest.vue';
import Rogue from '../components/Heroes/Rogue.vue';
import Shaman from '../components/Heroes/Shaman.vue';
import Warlock from '../components/Heroes/Warlock.vue';
import Warrior from '../components/Heroes/Warrior.vue';
import Neutral from '../components/Heroes/Neutral.vue';

export default {
  name: 'AllCardsView',
  components: {
    Druid,
    Hunter,
    Mage,
    Paladin,
    Priest,
    Rogue,
    Shaman,
    Warlock,
    Warrior,
    Neutral,
    Demonhunter
  },
  data() {
    return {
      hunter: false,
      mage: false,
      warrior: false,
      druid: false,
      rogue: false,
      shaman: false,
      priest: false,
      warlock: false,
      paladin: false,
      demonhunter: false,
      neutral: false
    };
  },
  methods: {}
};
</script>
<style>
.fade-enter {
  opacity: 0;
}
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease-out;
}
.fade-leave-to {
  opacity: 0;
}
</style>
