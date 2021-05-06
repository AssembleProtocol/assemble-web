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
    background: linear-gradient(0deg, rgba(0, 0, 0, 0.02), rgba(0, 0, 0, 0.02));
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
  }
  .product-price {
    text-align: center;
    font-size: 18px;
    font-weight: bold;
    line-height: 32px;
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
  .contents-img {
    margin-top: 20px;
  }
  .contents-text {
    padding: 20px;
    white-space: pre-line;
  }
  .buy-button {
    position: sticky;
    bottom: 20px;
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
      p.product-brand-name {{ marketItem.brandName }}
      p.product-name {{ marketItem.name }}
      p.product-price {{ marketItem.price | displayNumber }} P
    hr.divider
    .contents(v-if="marketItem")
      h2.contents-title 상품 상세 정보 및 유의사항
      img.contents-img(
        v-if="marketItem.descriptionImage",
        :src="marketItem.descriptionImage",
        width="100%",
      )
      p.contents-text {{ marketItem.descriptionText }}
    button.buy-button(@click="order") 구입하기
</template>

<script>
const DUMMY_MARKET_ITEM = {
  _id: '1',
  brandName: '스타벅스',
  name: '아이스 아메리카노 Tall',
  price: 4100,
  image: 'https://file2.nocutnews.co.kr/newsroom/image/2018/03/15/20180315163346993745_0_763_677.jpg',
  descriptionText: '▶ 상품설명\n스타벅스의 깔끔한 맛을 자랑하는 커피로, 스타벅스 파트너들이 가장 좋아하는 커피입니다.\n\n\n▶ 유의사항\n- 상기 이미지는 연출된 것으로 실제와 다를 수 있습니다.\n- 본 상품은 매장 재고 상황에 따라 동일 상품으로 교환이 불가능할 수 있습니다.\n- 동일 상품 교환이 불가능한 경우 동일 가격 이상의 다른 상품으로 교환이 가능하며 차액은 추가 지불하여야 합니다.\n- 정식 판매처 외의 장소나 경로를 통하여 구매하거나 기타의 방법으로 보유하신 쿠폰은 사용이 금지/제한될 수 있으니 주의하시기 바랍니다.\n- 해당 쿠폰과 스타벅스 카드의 복합결제 거래는 스타벅스 카드의 고유혜택인 Free Extra 적용대상이 아닌 점 이용에 참고하시기 바랍니다.\n- 해당 쿠폰 거래시 스타벅스 카드의 고유혜택인 별적립 적용대상이 아닌 점 이용에 참고하시기 바랍니다.\n- 스타벅스 앱의 사이렌 오더를 통해서도 주문 및 결제가 가능합니다.\n\n▶ 사용불가매장\n미군부대 매장(오산AB, 평택험프리, 대구캠프워커, 군산AB, 캠프케롤, 캠프케이시, 평택험프리 트룹몰, 평택험프리 메인몰), 오션월드점',
  descriptionImage: 'https://biz.giftishow.com/files/BBS_20190628013620051.jpg',
};

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
  data() {
    return {
      marketItem: null,
    };
  },
  mounted() {
    // TODO: marketItem 정보 가져오기 api
    this.marketItem = DUMMY_MARKET_ITEM;
  },
  methods: {
    order() {
      this.$router.push(`/store/orders/${this.productId}`);
    },
  },
};
</script>
