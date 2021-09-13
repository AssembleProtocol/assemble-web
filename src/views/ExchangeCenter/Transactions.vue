<style lang="less" scoped>
  .exchange-center-transactions-container {
    // height: 100%;
    // overflow-y: auto;
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
  section.exchange-center-transactions-container(
    v-infinite-scroll="fetchTransactions",
    :infinite-scroll-immediate-check="false",
    :infinite-scroll-distance="300",
  )
    .contents.assemble-section.dark
      header.nav
        h1.nav-title {{ $t('title') }}
      .transaction-list
        transaction-item(
          v-for="transaction in transactions",
          :key="transaction._id",
          :transaction="transaction",
        )
</template>

<script>
import TransactionItem from './components/TransactionItem';

const LIMIT = 20;

export default {
  components: {
    TransactionItem,
  },
  data() {
    return {
      fetchLoading: false,
      initLoading: false,
      offset: 0,
      hasMore: false,
      transactions: null,
    };
  },
  mounted() {
    this.$emit('hideNavPoint');
    document.documentElement.classList.add('full-height-exchange');
    this.initTransactions();
  },
  destroyed() {
    this.$emit('showNavPoint');
    document.documentElement.classList.remove('full-height-exchange');
  },
  methods: {
    async initTransactions() {
      if (this.initLoading) return;
      this.initLoading = true;
      try {
        const { data: transactions } = await this.$http.get('/exchange/transactions', { params: { offset: 0, limit: LIMIT } });
        this.transactions = transactions;

        if (this.transactions.length === LIMIT) this.hasMore = true;
        else this.hasMore = false;
      } catch (e) {
        if (!e.response || !e.response.data) return;
        this.$toast(e.response.data.message);
      } finally {
        this.initLoading = false;
      }
    },
    async fetchTransactions() {
      if (this.fetchLoading || !this.hasMore) return;
      this.fetchLoading = true;
      try {
        this.offset += LIMIT;
        const { data: transactions } = await this.$http.get('/exchange/transactions', { params: { offset: this.offset, limit: LIMIT } });
        transactions.forEach((transaction) => this.transactions.push(transaction));

        if (transactions.length === LIMIT) this.hasMore = true;
        else this.hasMore = false;
      } catch (e) {
        if (!e.response || !e.response.data) return;
        this.$toast(e.response.data.message);
      } finally {
        this.fetchLoading = false;
      }
    },
  },
};
</script>

<i18n>
{
  "ko": {
    "title": "트랜잭션"
  },
  "en": {
    "title": "Transaction"
  },
  "ja": {
    "title": "Transaction"
  },
  "cn": {
    "title": "Transaction"
  }
}
</i18n>
