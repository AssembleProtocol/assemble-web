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
        :image="ticket.itemImage",
        :brandName="ticket.itemBrandName",
        :name="ticket.itemName",
      )
      .form-group
        p.label 받는 번호
        p.value {{ phoneNumber }}
      p.notice-description 받는 번호로 곧 티켓이 도착합니다!
</template>

<script>
import { mapState } from 'vuex';
import ProductListItem from './components/ProductListItem';

const DUMMY_TICKET = {
  _id: '1',
  itemId: '1',
  itemBrandName: '스타벅스',
  itemImage: 'https://file2.nocutnews.co.kr/newsroom/image/2018/03/15/20180315163346993745_0_763_677.jpg',
  itemName: '아이스 아메리카노 Tall',
  paid: 4100,
  expire: '2021-05-08T07:51:08.413Z',
};

export default {
  components: {
    ProductListItem,
  },
  computed: {
    ...mapState({
      phoneNumber: (state) => state.route.query.phoneNumber,
    }),
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
      this.$router.back();
    },
  },
};
</script>
