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
    img.icon(v-if="transferType === '보냄'", src="~@/assets/transaction-send.svg", width="32", height="32")
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
      return moment(date).fromNow();
    },
  },
  computed: {
    transferType() {
      return this.transaction.amount > 0 ? '받음' : '보냄';
    },
    title() {
      return this.transferType;
    },
    description() {
      const prefix = this.transferType === '받음' ? '보낸 주소' : '받는 주소';
      const { type } = this.transaction;
      let text = '알 수 없음';
      if (type === 'initialized') {
        text = '어셈블';
      } else if (type === 'exchange') {
        text = '어셈블 교환소';
      } else if (type === 'external') {
        const address = this.transferType === '받음'
          ? this.transaction.addressFrom : this.transaction.addressTo;
        text = `${address.slice(0, 6)}...${address.slice(-4)}`;
      } else if (type === 'internal') {
        const name = this.transferType === '받음'
          ? this.transaction.userNameFrom : this.transaction.userNameTo;
        text = name;
      }
      return `${prefix}: ${text}`;
    },
    amount() {
      if (this.transferType === '보냄') {
        return Number(this.transaction.amount).toLocaleString();
      }
      return `+ ${Number(this.transaction.amount).toLocaleString()}`;
    },
  },
};
</script>
