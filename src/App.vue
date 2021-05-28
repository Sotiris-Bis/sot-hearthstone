<template>
  <div id="app" :class="theme" >
    
      <!-- <router-link to="/">Home</router-link> | <router-link to="/deckSearch">DeckSearch</router-link> |
      <router-link to="/allcardsview">All Cards View</router-link> | <router-link to="/arena">Arena</router-link> |
      <router-link to="/all_cards">All Cards Table</router-link> | -->
    <Navbar />
    
    <transition name="fade" >
      <router-view />
    </transition>
    <NotificationContainer />
  </div>
</template>

<script>
import { mapState } from 'vuex';
import NotificationContainer from './components/NotificationContainer';
import Navbar from './components/Navbar';
export default {
  components: {
    NotificationContainer,
    Navbar
  },
  computed: {
    ...mapState(['theme'])
  }
};
</script>

<style>

</style>
