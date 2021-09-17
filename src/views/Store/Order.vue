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
      h1.title {{ $t('title') }}
    .contents.assemble-section(v-if="marketItem")
      product-list-item(
        :image="marketItem.image",
        :brandName="marketItem.brandName",
        :name="marketItem.name",
      )
      bg-input.phone-number-input(
        type="tel",
        :placeholder="$t('placeholder')",
        v-model="phoneNumber",
        @input="validPhoneNumber",
      )
      .invoice-box
        .form-group
          p.label {{ $t('holdingPoints') }}
          p.value {{ totalAsp | displayNumber }} P
        .form-group
          p.label {{ $t('productPrice') }}
          p.value - {{ marketItem.price | displayNumber }} P
        hr.divider
        .form-group
          p.label {{ $t('sum') }}
          p.value {{ afterPaidTotalAsp | displayNumber }} P
      button.submit-button(
        :class="{ inactive: !phoneNumberValidity }",
        @click="submitOrder",
      ) {{ validityText }}
      p.notice-description {{ $t('description') }}
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
      if (this.phoneNumberValidity) return this.$t('validityText');
      return this.$t('invalidityText');
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
      this.$router.replace(this.$localePath(`/store/order-complete/${data.purchaseItem._id}`));
    },
  },
};
</script>

<i18n>
{
  "ko": {
    "title": "포인트로 구입하기",
    "placeholder": "티켓을 받을 휴대전화번호 입력",
    "holdingPoints": "보유 포인트",
    "productPrice": "상품 가격",
    "sum": "합계",
    "description": "30일간 유효합니다.",
    "validityText": "구입하기",
    "invalidityText": "유효한 휴대전화번호를 입력하세요"
  },
  "en": {
    "title": "Buy as a point",
    "placeholder": "enter the mobile phone number to receive",
    "holdingPoints": "holding points",
    "productPrice": "product price",
    "sum": "sum",
    "description": "Valid for 30 days.",
    "validityText": "Buy",
    "invalidityText": "Please enter a valid phone number."
  },
  "ja": {
    "title": "ポイントで購入する",
    "placeholder": "チケットを受信する携帯電話番号の入力。",
    "holdingPoints": "保有ポイント",
    "productPrice": "商品価格",
    "sum": "合計",
    "description": "30日間有効です。",
    "validityText": "購入する",
    "invalidityText": "有効な携帯電話番号を入力してください。"
  },
  "cn": {
    "title": "作为点缀购买",
    "placeholder": "入可领取门票的手机号",
    "holdingPoints": "仓点",
    "productPrice": "品价格",
    "sum": "计",
    "description": "效期30天。",
    "validityText": "买",
    "invalidityText": "输入有效的手机号码。"
  }
}
</i18n>
