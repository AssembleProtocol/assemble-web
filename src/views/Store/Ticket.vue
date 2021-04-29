<style lang="less" scoped>
  .nav {
    position: sticky;
    top: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    height: 80px;
    padding: 0 20px;
    z-index: 999;
    background-color: #fff;
  }
  .back-button {
    position: absolute;
    top: 28px;
    left: 20px;
    width: 24px;
    height: 24px;
    background-image: url('~@/assets/back-button.png');
    background-repeat: no-repeat;
    background-size: cover;
  }
  .title {
    font-size: 16px;
    line-height: 26px;
  }
  .contents {
    display: flex;
    flex-direction: column;
    margin: -10px 0;
    padding: 0 20px;
  }
  .ticket-item {
    display: flex;
    align-items: center;
    margin: 10px 0;
  }
  .ticket-item-content {
    flex: 1;
  }
  .ticket-button {
    height: 30px;
    line-height: 30px;
    margin-left: 20px;
    border-radius: 4px;
    padding: 0 10px;
    background-color: #fafafa;
    font-size: 14px;
    font-weight: bold;
    color: #1D6AFE;

    &.expired {
      color: #ADADAD;
    }
  }
</style>

<template lang="pug">
  section.store-tickets-container
    nav.nav
      button.back-button(@click="$router.back()")
      h1.title 구입한 티켓들
    .contents
      .ticket-item
        .ticket-item-content
          product-list-item
        button.ticket-button(@click="goToResending") 재발송
      .ticket-item
        .ticket-item-content
          product-list-item
        button.ticket-button.expired 만료됨
</template>

<script>
import ProductListItem from './components/ProductListItem';

export default {
  components: {
    ProductListItem,
  },
  methods: {
    goToResending() {
      this.$router.push('/store/resend-ticket');
    },
  },
};
</script>
