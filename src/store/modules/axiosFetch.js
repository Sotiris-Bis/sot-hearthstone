import axios from 'axios';
import nProgress from 'nprogress';
import store from '..';

export default {
  namespaced: true,
  state: {
    cards: [],
    sets: [
      {
        value: 1000,
        text: 'Standar'
      }
    ],
    minionTypes: [],
    heroes: [],
    types: [],
    battlegroundHeroes: [],
    battleCards: [],
    standarCards: [],
    rarities: []
  },
  mutations: {
    RESET_CARDS(state) {
      (state.cards = []),
        (state.sets = [
          {
            value: 1000,
            text: 'Standar'
          }
        ]),
        (state.minionTypes = []),
        (state.heroes = []),
        (state.types = []),
        (state.battlegroundHeroes = []),
        (state.battleCards = []),
        (state.standarCards = []),
        (state.rarities = []);
    },
    SET_CARDS(state, payload) {
      state.cards.push(...payload);
    },
    SET_STANDAR_CARDS(state, payload) {
      state.standarCards.push(...payload);
    },
    SET_SETS(state, payload) {
      state.sets.push(...payload);
    },
    SET_MINION_TYPES(state, payload) {
      state.minionTypes.push(...payload);
    },
    SET_HEROES(state, payload) {
      state.heroes.push(...payload);
    },
    SET_TYPES(state, payload) {
      state.types.push(...payload);
    },
    SET_BATTLEGROUND_HEROES(state, payload) {
      state.battlegroundHeroes.push(...payload);
    },
    SET_BATTLEGROUND_CARDS(state, payload) {
      state.battleCards.push(...payload);
    },
    SET_RARITIES(state, payload) {
      state.rarities.push(...payload)
    }
  },
  actions: {
    getAllCards({ commit }) {
      commit('RESET_CARDS');
      const token = this.state.oauth.accessToken;
      const lang = this.state.lang;
      commit('loading/SET_LOADING', true, { root: true });
      nProgress.start();

      axios
        .get(`https://eu.api.blizzard.com/hearthstone/metadata/sets?locale=${lang}&access_token=${token}`)
        .then(res => {
          let sets = [];
          for (let set = 0; set <= res.data.length - 1; set++) {
            sets.push({ value: res.data[set].id, text: res.data[set].name });
          }
          commit('SET_SETS', sets);

          for (let set = 0; set <= res.data.length - 1; set++) {
            axios
              .get(
                `https://eu.api.blizzard.com/hearthstone/cards?locale=${lang}&set=${res.data[set].id}&pageSize=500&access_token=${token}`
              )
              .then(res => {
                // const notification = {
                //   type: 'success',
                //   message: `${res.data.cardCount} Cards have been added`
                // };
                // store.dispatch('addNotification', notification, { root: true });
                let cards = res.data.cards;
                commit('SET_CARDS', cards);
              });
          }

          const standarSets = [1525, 1637, 1466, 1443, 1414];
          for (let i = 0; i <= standarSets.length; i++) {
            axios
              .get(`https://eu.api.blizzard.com/hearthstone/cards?locale=${lang}&set=${standarSets[i]}&pageSize=500&access_token=${token}`)
              .then(res => {
                let stCards = res.data.cards;
                commit('SET_STANDAR_CARDS', stCards);
              });
          }
        })
        .then(() => {
          axios.get(`https://eu.api.blizzard.com/hearthstone/metadata/minionTypes?locale=${lang}&access_token=${token}`).then(res => {
            let filteredMinionTypes = res.data.filter(card => card.gameModes != 7);
            commit('SET_MINION_TYPES', filteredMinionTypes);
          });
        })
        .then(()=>{
          axios.get(`https://us.api.blizzard.com/hearthstone/metadata/rarities?locale=${lang}&access_token=${token}`).then((res)=>{
            let rarities =  res.data;
            commit('SET_RARITIES', rarities)
          })
        })
        .then(() => {
          axios.get(`https://eu.api.blizzard.com/hearthstone/metadata/classes?locale=${lang}&access_token=${token}`).then(res => {
            let heroes = res.data;
            commit('SET_HEROES', heroes);
          });
        })
        .then(() => {
          axios.get(`https://eu.api.blizzard.com/hearthstone/metadata/types?locale=${lang}&access_token=${token}`).then(res => {
            let types = res.data;
            commit('SET_TYPES', types);
          });
        })
        .then(() => {
          axios
            .get(
              `https://eu.api.blizzard.com/hearthstone/cards?locale=${lang}&gameMode=battlegrounds&tier=hero&pageSize=500&access_token=${token}`
            )
            .then(res => {
              let battleHeroes = res.data.cards;
              commit('SET_BATTLEGROUND_HEROES', battleHeroes);
            });
        })
        .then(() => {
          axios
            .get(`https://eu.api.blizzard.com/hearthstone/cards?locale=${lang}&gameMode=battlegrounds&pageSize=500&access_token=${token}`)
            .then(res => {
              let battleCards = res.data.cards.filter(card => card.cardTypeId == 4);
              commit('SET_BATTLEGROUND_CARDS', battleCards);
            });
        })
        .then(() => {
          commit('loading/SET_LOADING', false, { root: true });
        })
        .catch(error => {
          const notification = {
            type: 'error',
            message: 'There was an error ' + error.message
          };
          store.dispatch('addNotification', notification, { root: true });
          throw error;
        })
        .then(() => {
          nProgress.done();
        });
    }
  }
};
