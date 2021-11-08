<template>
  <div>
    <b-card class="bg-transparent" :img-src="photoUrl" :img-alt="title" img-top>
      <b-card-body>
        <b-card-title>{{ title }}</b-card-title>
        <slot name="title"></slot>
        <b-card-sub-title class="mb-2">{{ date }}</b-card-sub-title>
        <slot name="extras"></slot>
        <b-card-text>
          {{ text }}
        </b-card-text>
      </b-card-body>

      <b-card-body>
        <button class="bg-transparent" @click="getMyDeck(deckCode)">
          <span v-if="!loaded">Show Full Deck</span>
          <span v-else>Hide Deck</span>
        </button>
      </b-card-body>
    </b-card>
    <br />
  </div>
</template>

<script>
//import axios from 'axios';
export default {
  name: 'TwelveWins',
  data() {
    return {
      search: '',
      cards: [],

      hero: {},
      format: ''
    };
  },
  props: {
    heroClass: {
      type: String,
      required: true
    },
    title: {
      type: String,
      required: true
    },
    date: {
      type: String,
      required: true
    },
    text: {
      type: String,
      required: true
    },
    deckCode: {
      required: true
    },
    photoUrl: {
      type: String,
      required: true
    },
    loaded: {
      type: Boolean,
      required: true
    }
  },
  methods: {
    getMyDeck(deckCode) {
      this.$emit('clicked', deckCode);
    }
  }
};
</script>

<style scoped></style>
