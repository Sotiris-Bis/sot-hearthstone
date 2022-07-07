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
        <button class="bg-transparent" @click="getMyDeck(deckCode, secondaryArray)">
          <span v-if="!loaded"> {{ $t('button1') }}</span>
          <span v-else> {{ $t('button2') }}</span>
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
      type: [String, Array],
      required: true
    },
    photoUrl: {
      type: String,
      required: true
    },
    loaded: {
      type: Boolean,
      required: false
    },
    heroIs: {
      type: Boolean,
      required: false
    },
    secondaryArray: {
      type: Array,
      required: false
    }
  },
  methods: {
    getMyDeck(deckCode, secondaryArray) {
      this.$emit('clicked', deckCode, secondaryArray);
    },
  }
};
</script>

<style scoped></style>
