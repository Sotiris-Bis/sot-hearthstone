import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '../views/Home.vue';
import DeckSearch from '../views/DeckSearch.vue';
import AllCardsView from '../views/AllCardsView.vue';
import Arena3 from '../views/Arena3.vue';
import AllCards from '../views/AllCards.vue';
import NotFound from '../components/NotFound.vue';
import Error from '../views/Error.vue';
import Battlegrounds from '../views/Battlegrounds.vue';
Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/deckSearch',
    name: 'DeckSearch',
    component: DeckSearch
  },
  {
    path: '/allcardsview',
    name: 'AllCardsView',
    component: AllCardsView
  },
  {
    path: '/arena',
    name: 'Arena3',
    component: Arena3
  },
  {
    path: '/all_cards',
    name: 'AllCards',
    component: AllCards
  },
  {
    path: '/battlegrounds',
    name: 'Battlegrounds',
    component: Battlegrounds
  },
  {
    path: '*',
    name: 'not-found',
    component: NotFound
  },
  {
    path: '/error',
    name: 'Error',
    component: Error
  }
];

const router = new VueRouter({
  mode: 'history',
  routes
});

export default router;
