import router from '@/router';
import * as oauth from '@/api/oauth';
import store from '..';
//import axios from 'axios';
export default {
  namespaced: true,
  state: {
    accessToken: null
  },
  mutations: {
    SET_ACCESS_TOKEN(state, payload) {
      state.accessToken = payload;
    }
  },
  actions: {
    getToken({ commit }) {
      commit('loading/SET_LOADING', true, { root: true });
      // Get clients Ip function
      // async function getIpClient() {
      //   try {
      //     const response = await axios.get('https://api.ipify.org?format=json');
      //     console.log(response.data.ip);
      //   } catch (error) {
      //     console.error(error);
      //   }
      // }
      oauth
        .getToken()
        .then(({ data }) => {
          commit('SET_ACCESS_TOKEN', data.access_token);
          const notification = {
            type: 'success',
            message: `Blizzard authenticated`
          };
          store.dispatch('addNotification', notification, { root: true });
        })
        .then(() => {
          store.dispatch('axiosFetch/getAllCards');
          //getIpClient();
        })
        .catch(err => {
          commit('SET_ACCESS_TOKEN', null);
          const errObj = {
            message: err.message
          };
          if (err.response) {
            errObj.data = err.response.data;
            errObj.status = err.response.status;
          }
          commit('error/SET_ERROR', errObj, { root: true });
          router.push({ name: 'Error' });
        })
        .then(() => {
          commit('loading/SET_LOADING', false, { root: true });
        });
    }
  },
  getters: {
    getToken(state) {
      return state.accessToken;
    }
  }
};
