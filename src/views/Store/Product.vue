<style lang="less" scoped>
  @back-button-top: 24px;

  .back-button {
    position: fixed;
    top: @back-button-top;
    width: 32px;
    height: 32px;
    margin-left: 20px;
    border-radius: 12px;
    background-image: url('~@/assets/back-button.png');
    background-repeat: no-repeat;
    background-size: 24px;
    background-position: center;
    background-color: #FAFAFA;
    z-index: 999;
  }
  .header {
    margin-top: -@back-button-top;
  }
  .ratio-product-image-wrapper {
    position: relative;
    width: 100%;
    padding-top: 100%;
  }
  .product-image {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-size: cover;
    background-repeat: no-repeat;
    background-position: center;
    z-index: 1;
  }
  .product-image-overlay {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(0deg, rgba(0, 0, 0, 0.02), rgba(0, 0, 0, 0.02));
    z-index: 2;
  }
  .product-brand-name {
    margin-top: 10px;
    text-align: center;
    font-size: 14px;
    font-weight: bold;
    line-height: 25px;
  }
  .product-name {
    text-align: center;
    font-size: 14px;
    line-height: 25px;
    padding: 0 20px;
  }
  .product-price {
    text-align: center;
    font-size: 18px;
    font-weight: bold;
    line-height: 32px;
    letter-spacing: 0.05em;
  }
  .divider {
    width: calc(100% - 24px);
    height: 1px;
    margin: 20px 0 20px 12px;
    border: 0;
    background-color: rgba(31, 46, 68, .1);
  }
  .contents-title {
    margin: 0 20px;
    font-size: 14px;
    font-weight: bold;
    line-height: 25px;
  }
  .contents-text {
    padding: 20px;
    font-size: 12px;
    line-height: 24px;
    color: #48596D;
    white-space: pre-line;
  }
  .buy-button {
    position: sticky;
    bottom: 20px;
    display: block;
    width: calc(100% - 40px);
    height: 55px;
    margin-left: 20px;
    border-radius: 9px;
    background-color: #1D6AFE;
    text-align: center;
    font-size: 18px;
    font-weight: bold;
    color: #fff;

    &.inactive {
      background-color: #868A93;
      color: #D6D9E0;
    }
  }
</style>

<template lang="pug">
  section.store-product-detail-container
    button.back-button(@click="$router.back()")
    header.header(v-if="marketItem")
      .ratio-product-image-wrapper
        .product-image(:style="{ backgroundImage: marketItem.image ? `url(${marketItem.image})` : '' }")
        .product-image-overlay
      p.product-brand-name {{ marketItem.brandName }}
      p.product-name {{ marketItem.name }}
      p.product-price {{ marketItem.price | displayNumber }} P
    hr.divider
    .contents(v-if="marketItem")
      h2.contents-title 상품 상세 정보 및 유의사항
      p.contents-text {{ marketItem.descriptionText }}
      img.contents-img(
        v-if="marketItem.descriptionImage",
        :src="marketItem.descriptionImage",
        width="100%",
      )
    button.buy-button(
      :class="{ inactive: notEnoughAsp }"
      @click="order",
    ) {{ notEnoughAspText }}
</template>

<script>
import gql from 'graphql-tag';

export default {
  props: {
    productId: {
      type: String,
      default: null,
    },
  },
  filters: {
    displayNumber(number) {
      return Number(number).toLocaleString();
    },
  },
  computed: {
    notEnoughAsp() {
      if (Number(this.totalAsp) < Number(this.marketItem.price)) return true;
      return false;
    },
    notEnoughAspText() {
      if (this.notEnoughAsp) return '포인트가 부족해요';
      return '구입하기';
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
      totalAsp: 0,
    };
  },
  async mounted() {
    const { data: pointsData } = await this.$http.get('/users/me/points');
    const { points } = pointsData;
    this.totalAsp = points;
  },
  methods: {
    order() {
      if (this.notEnoughAsp) return;
      this.$router.push(`/store/orders/${this.productId}`);
    },
  },
};
</script>
