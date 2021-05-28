<template>
  <div class="not-bar" :class="notificationClass">
    <p>{{ notification.message }}</p>
  </div>
</template>

<script>
import { mapActions } from 'vuex';
export default {
  data() {
    return {
      timeout: null
    };
  },
  props: {
    notification: {
      type: Object,
      required: true
    }
  },
  mounted() {
    this.timeout = setTimeout(() => this.deleteNotification(this.notification), 3000);
  },
  beforeDestroy() {
    clearTimeout(this.timeout);
  },
  computed: {
    notificationClass() {
      return `-text-${this.notification.type}`;
    }
  },
  methods: {
    ...mapActions(['deleteNotification'])
  }
};
</script>

<style scoped>
.not-bar {
  margin: 1em 0 1em;
}
</style>
