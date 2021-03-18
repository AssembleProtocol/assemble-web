<style lang="less" scoped>
  .exchange-center-transactions-container {
    color: #F7F8FA;
  }
  .header {
    display: flex;
    align-items: center;
    margin-top: 20px;
    padding: 0 20px;
  }
  .header-title {
    color: #F7F8FA;
    font-size: 24px;
    line-height: 38px;
  }
  .contents {
    margin-top: 20px;
    padding: 0 20px;
  }
  .transaction-list {
    display: flex;
    flex-direction: column;
    margin: 0 -20px;
  }
</style>

<template lang="pug">
  section.exchange-center-transactions-container
    header.header
      h1.header-title 트랜잭션
    .contents
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
