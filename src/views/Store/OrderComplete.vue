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
    padding: 0 20px;
  }
  .invoice-box {
    margin-top: 20px;
  }
  .form-group {
    display: flex;
    align-items: center;
    justify-content: space-between;
    &:not(:first-child) {
      margin-top: 20px;
    }
  }
  .label {
    font-weight: bold;
    line-height: 32px;
    color: rgba(31, 46, 68, .6);
  }
  .value {
    font-weight: bold;
    line-height: 32px;
  }
  .divider {
    width: 100%;
    height: 1px;
    margin: 20px 0;
    border: 0;
    background-color: #C4C4C4;
  }
  .notice-description {
    margin-top: 20px;
    font-size: 14px;
    line-height: 28px;
    color: rgba(31, 46, 68, .6);
  }
</style>

<template lang="pug">
  section.store-order-complete-container
    nav.nav
      button.back-button(@click="$router.back()")
      h1.title 구입이 완료되었습니다!
    .contents
      product-list-item
      .invoice-box
        .form-group
          p.label 받는 번호
          p.value 01095339662
        hr.divider
        .form-group
          p.label 보유 포인트
          p.value 4,100 P
        .form-group
          p.label 상품 가격
          p.value - 4,100 P
        hr.divider
        .form-group
          p.label 합계
          p.value 0 P
      p.notice-description 받는 번호로 곧 티켓이 도착합니다!
</template>

<script>
import ProductListItem from './components/ProductListItem';

export default {
  props: {
    orderId: { type: String, required: true },
    phoneNumber: { type: String, required: true },
  },
  components: {
    ProductListItem,
  },
};
</script>
