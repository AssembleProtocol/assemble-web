<style lang="less" scoped>
  @back-button-top: 24px;

  .desktop-nav {
    display: none;
  }
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
    display: block;
    height: 55px;
    border-radius: 9px;
    background-color: #1D6AFE;
    text-align: center;
    font-size: 18px;
    font-weight: bold;
    color: #fff;

    &.sticky {
      position: sticky;
      bottom: 20px;
      width: calc(100% - 40px);
      margin-left: 20px;
    }
    &.inactive {
      background-color: #868A93;
      color: #D6D9E0;
    }
  }
  @media only screen and (min-width: 768px) {
    .store-product-detail-container {
      max-width: 1185px;
      margin: 0 auto;
    }
    .article {
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
      padding: 0 40px 40px 0;
      > * { flex-shrink: 0; }
    }
    .desktop-nav {
      display: flex;
      align-items: center;
      width: 100%;
      height: 120px;
      padding: 0 80px;
    }
    .desktop-nav-back-button {
      width: 32px;
      height: 32px;
      background-image: url('~@/assets/back-button.png');
      background-repeat: no-repeat;
      background-size: 24px;
      background-position: center;
    }
    .dekstop-nav-title {
      flex: 1;
      margin: 0 20px;
      text-align: center;
      font-weight: bold;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    .buy-button {
      height: 52px;
      padding: 0 40px;
    }
    .back-button, .divider, .buy-button.sticky {
      display: none;
    }
    .header {
      width: calc((100% - 40px) / 2);
      margin-top: 0;
      padding-bottom: 20px;
    }
    .ratio-product-image-wrapper {
      width: calc(100% - 40px);
      padding-top: calc(100% - 40px);
      margin: 20px 20px 10px 20px;
    }
    .contents {
      width: calc((100% - 40px) / 2);
      padding-top: 20px;
    }
  }
</style>

<template lang="pug">
  section.store-product-detail-container
    nav.desktop-nav
      button.desktop-nav-back-button(@click="$router.back()")
      p.dekstop-nav-title {{ marketItem.brandName }} {{ marketItem.name }}
      button.buy-button(
        :class="{ inactive: notEnoughAsp }"
        @click="order",
      ) {{ notEnoughAspText }}
    button.back-button(
      :style="{ marginTop: `${statusBarHeight}px` }",
      @click="$router.back()",
    )
    article.article
      header.header.assemble-section(v-if="marketItem")
        .ratio-product-image-wrapper
          .product-image(:style="{ backgroundImage: marketItem.image ? `url(${marketItem.image})` : '' }")
          .product-image-overlay
        p.product-brand-name {{ marketItem.brandName }}
        p.product-name {{ marketItem.name }}
        p.product-price {{ marketItem.price | displayNumber }} P
      hr.divider
      .contents.assemble-section(v-if="marketItem")
        h2.contents-title {{ $t('detailTitle') }}
        p.contents-text {{ marketItem.descriptionText }}
        img.contents-img(
          v-if="marketItem.descriptionImage",
          :src="marketItem.descriptionImage",
          width="100%",
        )
      button.buy-button.sticky(
        :class="{ inactive: notEnoughAsp }"
        @click="order",
      ) {{ notEnoughAspText }}
</template>

<script>
import gql from 'graphql-tag';
import { mapState } from 'vuex';

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
    ...mapState({
      locale: (state) => state.route.params.locale,
    }),
    notEnoughAsp() {
      if (!this.marketItem) return true;
      if (Number(this.totalAsp) < Number(this.marketItem.price)) return true;
      return false;
    },
    notEnoughAspText() {
      if (this.notEnoughAsp) return this.$t('notEnoughAspText');
      return this.$t('enoughAspText');
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
      statusBarHeight: 0,
    };
  },
  async mounted() {
    if (window.s3app && window.s3app.statusBarHeight) this.statusBarHeight = window.s3app.statusBarHeight;

    const { data: pointsData } = await this.$http.get('/users/me/points');
    const { points } = pointsData;
    this.totalAsp = points;
  },
  methods: {
    order() {
      if (this.notEnoughAsp) return;
      this.$router.push(this.$localePath(`/store/orders/${this.productId}`));
    },
  },
};
</script>

<i18n>
{
  "ko": {
    "detailTitle": "상품 상세 정보 및 유의사항",
    "enoughAspText": "구입하기",
    "notEnoughAspText": "포인트가 부족해요"
  },
  "en": {
    "detailTitle": "Product details and cautions",
    "enoughAspText": "Buy",
    "notEnoughAspText": "You don't have enough points."
  },
  "ja": {
    "detailTitle": "商品の詳細情報及び注意事項",
    "enoughAspText": "購入する",
    "notEnoughAspText": "「ポイント」が足りない。"
  },
  "cn": {
    "detailTitle": "商品详细信息及注意事项",
    "enoughAspText": "购买",
    "notEnoughAspText": "分数不够啊。"
  }
}
</i18n>
