<template>
  <div class="notification-container">
    <Notifications v-for="notification in notifications" :key="notification.id" :notification="notification" />
  </div>
</template>

<script>
import Notifications from './Notifications';
import { mapState } from 'vuex';

export default {
  components: {
    Notifications
  },
  computed: mapState(['notifications'])
};
</script>

<style scoped>
.notification-container {
  position: fixed;
  bottom: 20px;
  left: 0;
  padding-left: 20px;
  padding-right: 20px;
}
</style>
