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
    arenaSetsId: [25, 1130, 1414, 1525, 1443, 1466, 1637],
    lang: '',
    langs: ['en_GB', 'fr_FR']
  },
  mutations: {
    SET_THEME(state, payload) {
      state.theme = payload;
    },
    SET_LANG(state, payload) {
      state.lang = payload;
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
      } else {
        commit('SET_THEME', 'light');
        localStorage.setItem('theme', 'light');
      }
    },
    langSelector({ commit }) {
      if (localStorage.lang) {
        commit('SET_LANG', `${localStorage.lang}`);
        localStorage.setItem('lang', `${localStorage.lang}`);
      } else {
        commit('SET_LANG', 'en_GB');
        localStorage.setItem('lang', 'en_GB');
      }
    },
    set_theme({ commit }, payload) {
      commit('SET_THEME', payload);
    },
    set_lang({ commit }, payload) {
      commit('SET_LANG', payload);
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
