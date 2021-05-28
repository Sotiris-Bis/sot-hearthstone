<template>
  <div>
    <h1>OOooups The page you are looking for does not exist!!!</h1>

    <button @click.prevent="go">Go back</button>
  </div>
</template>
<script>
export default {
  methods: {
    go() {
      this.$router.go(-1);
    }
  }
};
</script>
