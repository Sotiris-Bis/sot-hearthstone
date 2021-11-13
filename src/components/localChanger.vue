<template>
  <div>
    <select v-model="$root.$i18n.locale" @change="toggleLang($event)" class="bg-transparent" :class="isDark ? 'text-white' : 'text-dark'">
      <option v-for="(lang, i) in langs" :key="`Lang${i}`" :value="lang">
        {{ lang }}
      </option>
    </select>
  </div>
</template>

<script>
import { mapState } from 'vuex';

export default {
  name: 'locale-changer',

  data() {
    return { langs: ['en_GB', 'fr_FR'] };
  },
  computed: {
    ...mapState(['theme', 'lang']),
    isDark() {
      if (this.theme == 'dark') {
        return true;
      } else return false;
    }
  },
  methods: {
    toggleLang(event) {
      if (this.lang === 'en_GB') {
        //console.log(event.target.value);
        this.$store
          .dispatch('set_lang', `${event.target.value}`)
          //localStorage.setItem('lang', `${event.target.value}`)
          .then(() => {
            localStorage.setItem('lang', `${event.target.value}`);
            this.$store.dispatch('axiosFetch/getAllCards');
          });
      } else {
        //console.log(event.target.value);
        this.$store
          .dispatch('set_lang', `${event.target.value}`)
          // localStorage.setItem('lang', `${event.target.value}`)
          .then(() => {
            localStorage.setItem('lang', `${event.target.value}`);
            this.$store.dispatch('axiosFetch/getAllCards');
          });
      }
    }
  }
};
</script>
