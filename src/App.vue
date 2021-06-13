<template>
  <div id="app" :class="theme">
    <Navbar />
    <transition name="fade">
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

<style></style>
