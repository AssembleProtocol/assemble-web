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
    margin-top: 20px;
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
  @media only screen and (min-width: 768px) {
    .nav {
      position: inherit;
      height: 120px;
      padding: 0 80px;
      background-color: transparent;
    }
    .back-button {
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
  section.store-order-container
    nav.nav
      button.back-button(@click="$router.back()")
      h1.title 포인트로 구입하기
    .contents.assemble-section(v-if="marketItem")
      product-list-item(
        :image="marketItem.image",
        :brandName="marketItem.brandName",
        :name="marketItem.name",
      )
      bg-input.phone-number-input(
        type="tel",
        placeholder="티켓을 받을 휴대전화번호 입력",
        v-model="phoneNumber",
        @input="validPhoneNumber",
      )
      .invoice-box
        .form-group
          p.label 보유 포인트
          p.value {{ totalAsp | displayNumber }} P
        .form-group
          p.label 상품 가격
          p.value - {{ marketItem.price | displayNumber }} P
        hr.divider
        .form-group
          p.label 합계
          p.value {{ afterPaidTotalAsp | displayNumber }} P
      button.submit-button(
        :class="{ inactive: !phoneNumberValidity }",
        @click="submitOrder",
      ) {{ validityText }}
      p.notice-description 30일간 유효합니다.
</template>

<script>
import gql from 'graphql-tag';
import Phone from 'phone';
import BgInput from '@/components/BgInput';
import ProductListItem from './components/ProductListItem';

export default {
  props: {
    productId: {
      type: String,
      default: null,
    },
  },
  components: {
    BgInput,
    ProductListItem,
  },
  filters: {
    displayNumber(number) {
      return Number(number).toLocaleString();
    },
  },
  computed: {
    afterPaidTotalAsp() {
      if (!this.marketItem) return 0;
      return Number(this.totalAsp) - Number(this.marketItem.price);
    },
    validityText() {
      if (this.phoneNumberValidity) return '구입하기';
      return '유효한 휴대전화번호를 입력하세요';
    },
  },
  apollo: {
    marketItem: {
      query: gql`query ($_id: ID!) {
        marketItem(_id: $_id) {
          _id
          brandName
          name
          price
          image
          descriptionText
          descriptionImage
        }
      }`,
      variables() {
        return {
          _id: this.productId,
        };
      },
    },
  },
  data() {
    return {
      phoneNumber: null,
      phoneNumberValidity: false,
      totalAsp: 0,
    };
  },
  async mounted() {
    const { data: pointsData } = await this.$http.get('/users/me/points');
    const { points } = pointsData;
    this.totalAsp = points;
  },
  methods: {
    validPhoneNumber(value) {
      this.phoneNumberValidity = !!Phone(value, 'KOR').length;
    },
    async submitOrder() {
      if (!this.phoneNumberValidity) return;
      const { data } = await this.$apollo.mutate({
        mutation: gql`mutation ($itemId: ID!, $phoneNumber: String!) {
          purchaseItem(itemId: $itemId, phoneNumber: $phoneNumber) {
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
        variables: {
          itemId: this.marketItem._id,
          phoneNumber: this.phoneNumber,
        },
      });
      this.$router.replace(`/store/order-complete/${data.purchaseItem._id}`);
    },
  },
};
</script>
