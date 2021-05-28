import Vue from 'vue';
import Vuex from 'vuex';

import oauth from './modules/oauth';
import loading from './modules/loading';
import error from './modules/error';
import rarity from './modules/rarity';
import axios from 'axios';
import axiosFetch from './modules/axiosFetch';
Vue.use(Vuex);

let newId = 1;
export default new Vuex.Store({
  state: {
    user: {
      ClientID: '8cdb614ecc3c4c22848b4707483ae94b',
      ClientSecret: '86NBHJr6pQEV7qV8o5GKvhoXg7EgpyXE'
    },
    // cards: [],
    // cardSets: [
    //   'madness-at-the-darkmoon-faire',
    //   'scholomance-academy',
    //   'demonhunter-initiate',
    //   'ashes-of-outland',
    //   'galakronds-awakening',
    //   'descent-of-dragons',
    //   'saviors-of-uldum',
    //   'rise-of-shadows',
    //   'rastakhans-rumble',
    //   'the-boomsday-project',
    //   'the-witchwood',
    //   'kobolds-and-catacombs',
    //   'knights-of-the-frozen-throne',
    //   'journey-to-ungoro',
    //   'mean-streets-of-gadgetzan',
    //   'one-night-in-karazhan',
    //   'whispers-of-the-old-gods',
    //   'league-of-explorers',
    //   'the-grand-tournament',
    //   'blackrock-mountain',
    //   'goblins-vs-gnomes',
    //   'naxxramas',
    //   'hall-of-fame',
    //   'classic',
    //   'basic'
    // ],
    minionTypes: [
      { id: 14, name: 'Murloc' },
      { id: 15, name: 'Demon' },
      { id: 17, name: 'Mech' },
      { id: 18, name: 'Elemental' },
      { id: 20, name: 'Beast' },
      { id: 21, name: 'Totem' },
      { id: 23, name: 'Pirate' },
      { id: 24, name: 'Dragon' },
      { id: 26, name: 'All' }
    ],
    theme: '',
    notifications: [],
    arenaSetsId: [25, 1130, 1414, 1525, 1443, 1466, 1637]
  },
  mutations: {
    // SET_CARDS(state, payload) {
    //   state.cards = payload;
    // }
    SET_THEME(state, payload) {
      state.theme = payload;
    },
    PUSH_NOTIFICATION(state, notification) {
      state.notifications.push({
        ...notification,
        id: newId++
      });
    },
    DELETE_NOTIFICATION(state, notificationToDelete) {
      state.notifications = state.notifications.filter(notification => notification.id !== notificationToDelete.id);
    }
  },
  actions: {
    getMinionTyepes(token) {
      axios
        .get(`https://eu.api.blizzard.com/hearthstone/metadata/rarities?locale=en_US&access_token=${token}`)
        .then(res => {
          console.log(res.data);
        })
        .catch(e => {
          console.log(e.message);
        });
    },
    themeSelector({ commit }) {
      if (localStorage.theme === 'dark') {
        commit('SET_THEME', 'dark');
      } else commit('SET_THEME', 'light');
    },
    set_theme({ commit }, payload) {
      commit('SET_THEME', payload);
    },
    addNotification({ commit }, notification) {
      commit('PUSH_NOTIFICATION', notification);
    },
    deleteNotification({ commit }, notificationToDelete) {
      commit('DELETE_NOTIFICATION', notificationToDelete);
    }
  },
  modules: {
    oauth,
    loading,
    error,
    rarity,
    axiosFetch
  }
});
