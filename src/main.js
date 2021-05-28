import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';

import './assets/css/styles.css';
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue';

// Import Bootstrap an BootstrapVue CSS files (order is important)
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';

// Make BootstrapVue available throughout your project
Vue.use(BootstrapVue);
// Optionally install the BootstrapVue icon components plugin
Vue.use(IconsPlugin);

//Progress bar
import 'nprogress/nprogress.css';

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  methods: {
    init() {
      store.dispatch('oauth/getToken', null, { root: true });
    }
  },
  created() {
    this.init();
    // console.log('process.env:')
    // console.log(process.env)
    this.$store.dispatch('themeSelector');
  },

  render: h => h(App)
}).$mount('#app');
