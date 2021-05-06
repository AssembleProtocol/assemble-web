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
</style>

<template lang="pug">
  section.store-order-container
    nav.nav
      button.back-button(@click="$router.back()")
      h1.title 포인트로 구입하기
    .contents(v-if="marketItem")
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
import Phone from 'phone';
import BgInput from '@/components/BgInput';
import ProductListItem from './components/ProductListItem';

const DUMMY_MARKET_ITEM = {
  _id: '1',
  brandName: '스타벅스',
  image: 'https://file2.nocutnews.co.kr/newsroom/image/2018/03/15/20180315163346993745_0_763_677.jpg',
  name: '아이스 아메리카노 Tall',
  price: 4100,
  descriptionText: '▶ 상품설명\n스타벅스의 깔끔한 맛을 자랑하는 커피로, 스타벅스 파트너들이 가장 좋아하는 커피입니다.\n\n\n▶ 유의사항\n- 상기 이미지는 연출된 것으로 실제와 다를 수 있습니다.\n- 본 상품은 매장 재고 상황에 따라 동일 상품으로 교환이 불가능할 수 있습니다.\n- 동일 상품 교환이 불가능한 경우 동일 가격 이상의 다른 상품으로 교환이 가능하며 차액은 추가 지불하여야 합니다.\n- 정식 판매처 외의 장소나 경로를 통하여 구매하거나 기타의 방법으로 보유하신 쿠폰은 사용이 금지/제한될 수 있으니 주의하시기 바랍니다.\n- 해당 쿠폰과 스타벅스 카드의 복합결제 거래는 스타벅스 카드의 고유혜택인 Free Extra 적용대상이 아닌 점 이용에 참고하시기 바랍니다.\n- 해당 쿠폰 거래시 스타벅스 카드의 고유혜택인 별적립 적용대상이 아닌 점 이용에 참고하시기 바랍니다.\n- 스타벅스 앱의 사이렌 오더를 통해서도 주문 및 결제가 가능합니다.\n\n▶ 사용불가매장\n미군부대 매장(오산AB, 평택험프리, 대구캠프워커, 군산AB, 캠프케롤, 캠프케이시, 평택험프리 트룹몰, 평택험프리 메인몰), 오션월드점',
  descriptionImage: 'https://biz.giftishow.com/files/BBS_20190628013620051.jpg',
};

export default {
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
  data() {
    return {
      phoneNumber: null,
      phoneNumberValidity: false,
      marketItem: null,
      totalAsp: 0,
    };
  },
  async mounted() {
    const { data: pointsData } = await this.$http.get('/users/me/points');
    const { points } = pointsData;
    this.totalAsp = points;
    // TODO: marketItem 정보 가져오기 api
    this.marketItem = DUMMY_MARKET_ITEM;
  },
  methods: {
    validPhoneNumber(value) {
      this.phoneNumberValidity = !!Phone(value, 'KOR').length;
    },
    submitOrder() {
      if (!this.phoneNumberValidity) return;
      // TODO: order api 호출
      this.$router.replace('/store/order-complete/456');
    },
  },
};
</script>
