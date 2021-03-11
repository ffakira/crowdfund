<template>
  <div class="home">
    <button @click="connectMetamask">Connect</button>
    {{ account }}
  </div>
</template>

<script>

export default {
  name: 'Home',
  methods: {
    async connectMetamask() {
      await this.$store.dispatch("loadWeb3");
    }
  },
  computed: {
    account() {
      return this.$store.getters.getAccount;
    }
  }
}
</script>
