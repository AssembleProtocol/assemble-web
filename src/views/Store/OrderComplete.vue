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
  @media only screen and (min-width: 768px) {
    .nav {
      position: relative;
      top: unset;
      height: 120px;
      padding: 0 80px;
      background-color: transparent;
    }
    .close-button {
      top: 48px;
      left: 80px;
    }
    .contents {
      margin: 0 auto;
      padding: 20px;
    }
  }
</style>

<template lang="pug">
  section.store-order-complete-container
    nav.nav
      button.close-button(@click="goToHome")
      h1.title {{ $t('title') }}
    .contents.assemble-section(v-if="purchasedItem")
      product-list-item(
        :image="purchasedItem.itemImage",
        :brandName="purchasedItem.itemBrandName",
        :name="purchasedItem.itemName",
      )
      .invoice-box
        .form-group
          p.label {{ $t('receivePhoneNumber') }}
          p.value {{ purchasedItem.phoneNumber }}
        hr.divider
        .form-group
          p.label {{ $t('holdingPoints') }}
          p.value {{ afterPaidTotalAsp | displayNumber }} P
        .form-group
          p.label {{ $t('productPrice') }}
          p.value - {{ purchasedItem.paid | displayNumber }} P
        hr.divider
        .form-group
          p.label {{ $t('sum') }}
          p.value {{ totalAsp | displayNumber }} P
      p.notice-description {{ $t('description') }}
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
      this.$router.push(this.$localePath('/'));
    },
  },
};
</script>

<i18n>
{
  "ko": {
    "title": "구입이 완료되었습니다!",
    "receivePhoneNumber": "받는 핸드폰 번호",
    "holdingPoints": "보유 포인트",
    "productPrice": "상품 가격",
    "sum": "합계",
    "description": "받는 번호로 몇 분 내로 티켓이 도착합니다!"
  },
  "en": {
    "title": "Your purchase is complete!",
    "receivePhoneNumber": "phone number you receive",
    "holdingPoints": "holding points",
    "productPrice": "product price",
    "sum": "sum",
    "description": "Your ticket will arrive in a few minutes at the number you receive!"
  },
  "ja": {
    "title": "購入が完了しました！",
    "receivePhoneNumber": "受信する携帯番号",
    "holdingPoints": "保有ポイント",
    "productPrice": "商品価格",
    "sum": "合計",
    "description": "受信番号で数分以内にチケットが到着します!"
  },
  "cn": {
    "title": "购买完毕！",
    "receivePhoneNumber": "收件手机号",
    "holdingPoints": "持仓点",
    "productPrice": "商品价格",
    "sum": "合计",
    "description": "几分钟内就能收到票！"
  }
}
</i18n>
