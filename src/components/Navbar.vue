<template>
  <div>
    <b-navbar toggleable="md" class="bg-transparent" >
      <b-navbar-brand><router-link to="/" class="trol" >My app</router-link></b-navbar-brand>

      <b-navbar-toggle target="nav-collapse" ></b-navbar-toggle>

      <b-collapse id="nav-collapse" is-nav >
        <b-navbar-nav>
        <b-nav-item>
          <router-link to="/deckSearch" class="trol" :class="isDark ? 'text-white' : 'text-dark'">12 Wins Arenas.</router-link>
        </b-nav-item>
        <b-nav-item>
          <router-link to="/allcardsview" class="trol" :class="isDark ? 'text-white' : 'text-dark'">All Cards per Hero.</router-link>
         </b-nav-item>
        <b-nav-item>
          <router-link to="/arena" class="trol" :class="isDark ? 'text-white' : 'text-dark'">Arena.</router-link>
           </b-nav-item>
        <b-nav-item>
          <router-link to="/all_cards" class="trol" :class="isDark ? 'text-white' : 'text-dark'">All Cards.</router-link>
           </b-nav-item>
        <b-nav-item>
          <router-link to="/battlegrounds" class="trol" :class="isDark ? 'text-white' : 'text-dark'">Battlegrounds.</router-link>
           </b-nav-item>
        </b-navbar-nav>

        <!-- Right aligned nav items -->
        <b-navbar-nav class="ml-auto">
          <b-button @click="toggleTheme()" variant="outline-dark" size="sm" pill >
            <svg height="20px" viewBox="0 0 512 512" width="20px" xmlns="http://www.w3.org/2000/svg">
              <path d="m211 435h90v77h-90zm0 0" fill="#766e6e" />
              <path d="m256 435h45v77h-45zm0 0" fill="#5b5555" />
              <path d="m181 375h150v60h-150zm0 0" fill="#e3eeff" />
              <path d="m256 375h75v60h-75zm0 0" fill="#c4d9f2" />
              <path
                d="m421 165c0 62.101562-35.097656 118.800781-90 146.699219v63.300781h-150v-63.300781c-56.101562-28.5-90.601562-86.398438-90-148.800781.902344-89.097657 72.597656-162.898438 165-162.898438 91.800781.300781 165 74.097656 165 165zm0 0"
                fill="#ffda2d"
              />
              <path
                d="m421 165c0 62.101562-35.097656 118.800781-90 146.699219v63.300781h-75v-375c91.800781.300781 165 74.097656 165 165zm0 0"
                fill="#fdbf00"
              />
              <path d="m451 150h61v30h-61zm0 0" fill="#fdbf00" />
              <path d="m0 150h61v30h-61zm0 0" fill="#ffda2d" />
              <path d="m469.339844 305.492188-51.957032-30 15-25.984376 51.957032 30zm0 0" fill="#fdbf00" />
              <path d="m79.617188 80.492188-51.957032-30 15-25.984376 51.957032 30zm0 0" fill="#ffda2d" />
              <path d="m432.382812 80.492188-15-25.984376 51.957032-30 15 25.984376zm0 0" fill="#fdbf00" />
              <path d="m42.660156 305.492188-15-25.984376 51.957032-30 15 25.984376zm0 0" fill="#ffda2d" />
              <path
                d="m317.199219 150-61.199219 76.5-18.300781 22.800781-23.398438-18.601562 40.5-50.699219h-60l61.199219-76.5 18.300781-22.800781 23.398438 18.601562-40.5 50.699219zm0 0"
                fill="#fdbf00"
              />
              <path d="m317.199219 150-61.199219 76.5v-123l18.300781-22.800781 23.398438 18.601562-40.5 50.699219zm0 0" fill="#ff9100" />
              <path d="m151 360h210v30h-210zm0 0" fill="#c4d9f2" />
              <path d="m256 360h105v30h-105zm0 0" fill="#a9c3ea" />
              <path d="m151 420h210v30h-210zm0 0" fill="#c4d9f2" />
              <path d="m256 420h105v30h-105zm0 0" fill="#a9c3ea" />
            </svg>
          </b-button>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
  </div>
</template>

<script>
import { mapState } from 'vuex';

export default {
  name: 'Navbar',
  computed: {
    ...mapState(['theme']),
    isDark(){
      if(this.theme == 'dark'){
        return true
      } else return false
    },
  },
  methods: {
    toggleTheme() {
      let mainTheme = this.$store.state.theme;
      if (mainTheme === 'dark') {
        this.$store.dispatch('set_theme', 'light').then(() => {
          localStorage.setItem('theme', 'light');
        });
      } else {
        this.$store.dispatch('set_theme', 'dark').then(() => {
          localStorage.setItem('theme', 'dark');
        });
      }
    }
  },
};
</script>
<style scoped>
.trol {
  padding: 5px;
}
</style>
