<style lang="less" scoped>
  .transaction-item-container {
    position: relative;
    display: flex;
    height: 80px;
    padding: 10px 20px 10px 10px;

    &::after {
      content: "";
      display: block;
      position: absolute;
      bottom: 0;
      left: 52px;
      height: 1px;
      width: calc(100% - 52px);
      background-color: #314662;
    }
  }
  .center {
    flex: 1;
    margin-left: 10px;
  }
  .header {
    display: flex;
    align-items: center;
  }
  .title {
    line-height: 32px;
  }
  .date {
    margin-left: 10px;
    font-size: 12px;
    line-height: 24px;
    color: #6096FF;
  }
  .address {
    font-size: 14px;
    line-height: 28px;
    color: #c1c4ca;
  }
  .point {
    margin: 20px 0 0 10px;
    text-align: right;
    font-size: 14px;
    line-height: 21px;
    font-weight: bold;
  }
</style>

<template lang="pug">
  .transaction-item-container
    img.icon(v-if="transaction.transferType === 'WITHDRAWAL'", src="~@/assets/transaction-send.svg", width="32", height="32")
    img.icon(v-else, src="~@/assets/transaction-receive.svg", width="32", height="32")
    .center
      .header
        strong.title {{ title }}
        .date {{ transaction.createdAt | dateFilter }}
      p.address {{ description }}
    .point {{ amount }} ASM
</template>

<script>
import moment from 'moment';

moment.locale('ko');

export default {
  props: {
    transaction: { type: Object, default: null },
  },
  filters: {
    dateFilter(date) {
      return moment(date - 0).fromNow();
    },
  },
  computed: {
    title() {
      if (this.transaction.transferType === 'WITHDRAWAL') return '보냄';
      return '받음';
    },
    description() {
      if (this.transaction.transferType === 'WITHDRAWAL') {
        const address = this.transaction.to;
        const addressText = `${address.slice(0, 6)}...${address.slice(-4)}`;
        return `받는 주소 ${addressText}`;
      }
      const address = this.transaction.from;
      const addressText = `${address.slice(0, 6)}...${address.slice(-4)}`;
      return `보낸 주소 ${addressText}`;
    },
    amount() {
      if (this.transaction.transferType === 'WITHDRAWAL') {
        return `- ${Number(this.transaction.amount).toLocaleString()}`;
      }
      return `+ ${Number(this.transaction.amount).toLocaleString()}`;
    },
  },
};
</script>
