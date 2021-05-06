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
  .form-group {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-top: 20px;
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
      h1.title 재발송 요청이 완료되었습니다.
    .contents(v-if="ticket")
      product-list-item(
        :image="ticket.image",
        :brandName="ticket.brandName",
        :name="ticket.name",
      )
      .form-group
        p.label 받는 번호
        p.value {{ ticket.phoneNumber }}
      p.notice-description 받는 번호로 곧 티켓이 도착합니다!
</template>

<script>
import ProductListItem from './components/ProductListItem';

const DUMMY_TICKET = {
  _id: '1',
  phoneNumber: '01095339662',
  brandName: '스타벅스',
  image: 'https://file2.nocutnews.co.kr/newsroom/image/2018/03/15/20180315163346993745_0_763_677.jpg',
  name: '아이스 아메리카노 Tall',
  price: 4100,
  expire: '2021-05-08T07:51:08.413Z',
  descriptionText: '▶ 상품설명\n스타벅스의 깔끔한 맛을 자랑하는 커피로, 스타벅스 파트너들이 가장 좋아하는 커피입니다.\n\n\n▶ 유의사항\n- 상기 이미지는 연출된 것으로 실제와 다를 수 있습니다.\n- 본 상품은 매장 재고 상황에 따라 동일 상품으로 교환이 불가능할 수 있습니다.\n- 동일 상품 교환이 불가능한 경우 동일 가격 이상의 다른 상품으로 교환이 가능하며 차액은 추가 지불하여야 합니다.\n- 정식 판매처 외의 장소나 경로를 통하여 구매하거나 기타의 방법으로 보유하신 쿠폰은 사용이 금지/제한될 수 있으니 주의하시기 바랍니다.\n- 해당 쿠폰과 스타벅스 카드의 복합결제 거래는 스타벅스 카드의 고유혜택인 Free Extra 적용대상이 아닌 점 이용에 참고하시기 바랍니다.\n- 해당 쿠폰 거래시 스타벅스 카드의 고유혜택인 별적립 적용대상이 아닌 점 이용에 참고하시기 바랍니다.\n- 스타벅스 앱의 사이렌 오더를 통해서도 주문 및 결제가 가능합니다.\n\n▶ 사용불가매장\n미군부대 매장(오산AB, 평택험프리, 대구캠프워커, 군산AB, 캠프케롤, 캠프케이시, 평택험프리 트룹몰, 평택험프리 메인몰), 오션월드점',
  descriptionImage: 'https://biz.giftishow.com/files/BBS_20190628013620051.jpg',
};

export default {
  components: {
    ProductListItem,
  },
  data() {
    return {
      ticket: null,
    };
  },
  mounted() {
    // TODO: ticket 정보 가져오기 api
    this.ticket = DUMMY_TICKET;
  },
  methods: {
    goToHome() {
      this.$router.push('/store/tickets');
    },
  },
};
</script>
