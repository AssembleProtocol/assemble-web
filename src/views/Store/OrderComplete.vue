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
  .close-button {
    position: absolute;
    top: 28px;
    left: 20px;
    width: 24px;
    height: 24px;
    background-image: url('~@/assets/close-black.svg');
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
      button.close-button(@click="goToHome")
      h1.title 구입이 완료되었습니다!
    .contents(v-if="purchasedItem")
      product-list-item(
        :image="purchasedItem.itemImage",
        :brandName="purchasedItem.itemBrandName",
        :name="purchasedItem.itemName",
      )
      .invoice-box
        .form-group
          p.label 받는 번호
          p.value {{ purchasedItem.phoneNumber }}
        hr.divider
        .form-group
          p.label 보유 포인트
          p.value {{ afterPaidTotalAsp | displayNumber }} P
        .form-group
          p.label 상품 가격
          p.value - {{ purchasedItem.paid | displayNumber }} P
        hr.divider
        .form-group
          p.label 합계
          p.value {{ totalAsp | displayNumber }} P
      p.notice-description 받는 번호로 몇 분 내로 티켓이 도착합니다!
</template>

<script>
import gql from 'graphql-tag';
import ProductListItem from './components/ProductListItem';

export default {
  props: {
    purchasedId: {
      type: String,
      default: null,
    },
  },
  components: {
    ProductListItem,
  },
  filters: {
    displayNumber(number) {
      return Number(number).toLocaleString();
    },
  },
  computed: {
    afterPaidTotalAsp() {
      if (!this.purchasedItem) return 0;
      return Number(this.totalAsp) + Number(this.purchasedItem.paid);
    },
  },
  apollo: {
    purchasedItem: {
      query: gql`query ($_id: ID!) {
        purchasedItem(_id: $_id) {
          _id
          userId
          paid
          expire
          itemId
          itemName
          itemImage
          itemBrandName
          createdAt
          phoneNumber
        }
      }`,
      variables() {
        return {
          _id: this.purchasedId,
        };
      },
    },
  },
  data() {
    return {
      totalAsp: 0,
    };
  },
  async mounted() {
    const { data: pointsData } = await this.$http.get('/users/me/points');
    const { points } = pointsData;
    this.totalAsp = points;
  },
  methods: {
    goToHome() {
      this.$router.push('/');
    },
  },
};
</script>
