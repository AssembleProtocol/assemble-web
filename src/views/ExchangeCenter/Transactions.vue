<style lang="less" scoped>
  .exchange-center-transactions-container {
    color: #F7F8FA;
  }
  .nav {
    display: flex;
    align-items: center;
    margin-top: 20px;
  }
  .nav-title {
    color: #F7F8FA;
    font-size: 24px;
    line-height: 38px;
  }
  .contents {
    padding: 0 20px;
  }
  .transaction-list {
    display: flex;
    flex-direction: column;
    margin: 20px -20px 0 -20px;
  }
  @media only screen and (min-width: 768px) {
    .contents {
      margin: 0 auto;
      padding: 20px;
    }
    .nav {
      margin-top: 0;
    }
  }
</style>

<template lang="pug">
  section.exchange-center-transactions-container
    .contents.assemble-section.dark
      header.nav
        h1.nav-title 트랜잭션
      .transaction-list
        transaction-item(
          v-for="walletHistory in walletHistories",
          :key="walletHistory._id",
          :transaction="walletHistory",
        )
</template>

<script>
import TransactionItem from './components/TransactionItem';

export default {
  components: {
    TransactionItem,
  },
  data() {
    return {
      walletHistories: null,
    };
  },
  async mounted() {
    this.$emit('hideNavPoint');
    await this.fetchHistories();
  },
  destroyed() {
    this.$emit('showNavPoint');
  },
  methods: {
    async fetchHistories() {
      const { data: walletHistories } = await this.$http.get('/wallet/histories');
      this.walletHistories = walletHistories;
    },
  },
};
</script>
