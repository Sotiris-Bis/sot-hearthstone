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
    rarities: [
      { slug: 'common', id: 1, craftingCost: [50, 400], dustValue: [5, 50], name: 'Common' },
      { slug: 'free', id: 2, craftingCost: [null, null], dustValue: [null, null], name: 'Free' },
      { slug: 'rare', id: 3, craftingCost: [100, 800], dustValue: [20, 100], name: 'Rare' },
      { slug: 'epic', id: 4, craftingCost: [400, 1600], dustValue: [100, 400], name: 'Epic' },
      { slug: 'legendary', id: 5, craftingCost: [1600, 3200], dustValue: [400, 1600], name: 'Legendary' }
    ]
  },
  mutations: {
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
    }
  },
  actions: {
    getAllCards({ commit }) {
      const token = this.state.oauth.accessToken;
      commit('loading/SET_LOADING', true, { root: true });
      nProgress.start();
      axios
        .get(`https://us.api.blizzard.com/hearthstone/metadata/sets?locale=en_US&access_token=${token}`)
        .then(res => {
          const notification = {
            type: 'success',
            message: `Blizzard authenticated`
          };
          store.dispatch('addNotification', notification, { root: true });
          let sets = [];
          for (let set = 0; set <= res.data.length - 1; set++) {
            sets.push({ value: res.data[set].id, text: res.data[set].name });
          }
          commit('SET_SETS', sets);

          for (let set = 0; set <= res.data.length - 1; set++) {
            axios
              .get(`https://us.api.blizzard.com/hearthstone/cards?locale=en_US&set=${res.data[set].id}&pageSize=500&access_token=${token}`)
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
              .get(`https://us.api.blizzard.com/hearthstone/cards?locale=en_US&set=${standarSets[i]}&pageSize=500&access_token=${token}`)
              .then(res => {
                let stCards = res.data.cards;
                commit('SET_STANDAR_CARDS', stCards);
              });
          }
        })
        .then(() => {
          axios.get(`https://us.api.blizzard.com/hearthstone/metadata/minionTypes?locale=en_US&access_token=${token}`).then(res => {
            let minionTypes = res.data;
            commit('SET_MINION_TYPES', minionTypes);
          });
        })
        .then(() => {
          axios.get(`https://us.api.blizzard.com/hearthstone/metadata/classes?locale=en_US&access_token=${token}`).then(res => {
            let heroes = res.data;
            commit('SET_HEROES', heroes);
          });
        })
        .then(() => {
          axios.get(`https://us.api.blizzard.com/hearthstone/metadata/types?locale=en_US&access_token=${token}`).then(res => {
            let types = res.data;
            commit('SET_TYPES', types);
          });
        })
        .then(() => {
          axios
            .get(
              `https://us.api.blizzard.com/hearthstone/cards?locale=en_US&gameMode=battlegrounds&tier=hero&pageSize=500&access_token=${token}`
            )
            .then(res => {
              let battleHeroes = res.data.cards;
              commit('SET_BATTLEGROUND_HEROES', battleHeroes);
            });
        })
        .then(() => {
          axios
            .get(`https://us.api.blizzard.com/hearthstone/cards?locale=en_US&gameMode=battlegrounds&pageSize=500&access_token=${token}`)
            .then(res => {
              let battleCards = res.data.cards.filter(card => card.cardTypeId == 4);
              commit('SET_BATTLEGROUND_CARDS', battleCards);
            });
        })
        // .then(() => {
        //   console.log(this.state.battlegroundHeroes);
        //   //this.state.battlegroundHeroes.forEach(hero => console.log(hero.childIds));
        // })
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
