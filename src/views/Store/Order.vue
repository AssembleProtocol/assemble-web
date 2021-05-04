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
  .phone-number-input {
    width: 100%;
    height: 55px;
    margin-top: 20px;
    border-radius: 9px;
    padding: 0 10px;
    background-color: #F7F8FA;
    font-weight: bold;
    font-size: 18px;
    line-height: 55px;
    &::placeholder {
      font-weight: bold;
      font-size: 18px;
      line-height: 55px;
      color: #C5CAD0;
    }
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
  .submit-button {
    width: 100%;
    height: 55px;
    margin-top: 20px;
    border-radius: 9px;
    background-color: #1D6AFE;
    color: #fff;
    font-size: 18px;
    font-weight: bold;
    line-height: 55px;
    text-align: center;

    &.inactive {
      background-color: #868A93;
      color: #D6D9E0;
    }
  }
  .notice-description {
    margin-top: 20px;
    font-size: 14px;
    line-height: 28px;
    color: rgba(31, 46, 68, .6);
  }
</style>

<template lang="pug">
  section.store-order-container
    nav.nav
      button.back-button(@click="$router.back()")
      h1.title 포인트로 구입하기
    .contents
      product-list-item
      input.phone-number-input(
        type="tel",
        placeholder="티켓을 받을 휴대전화번호 입력",
        v-model="phoneNumber",
      )
      .invoice-box
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
      button.submit-button(
        :class="{ inactive: !phoneNumberValidity }",
        @click="order",
      ) 유효한 휴대전화번호를 입력하세요
      p.notice-description 30일간 유효합니다.
</template>

<script>
import ProductListItem from './components/ProductListItem';

export default {
  components: {
    ProductListItem,
  },
  props: {
    productId: { type: String, required: true },
  },
  computed: {
    phoneNumberValidity() {
      if (!this.phoneNumber) return false;
      return true;
    },
  },
  data() {
    return {
      phoneNumber: null,
    };
  },
  methods: {
    order() {
      if (!this.phoneNumberValidity) return;
      this.$router.push({
        path: '/store/order-complete/123',
        query: { phoneNumber: this.phoneNumber },
      });
    },
  },
};
</script>
