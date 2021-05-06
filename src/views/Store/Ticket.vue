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
    display: flex;
    flex-direction: column;
    margin: -10px 0;
    padding: 0 20px;
  }
  .ticket-item {
    display: flex;
    align-items: center;
    margin: 10px 0;
  }
  .ticket-item-content {
    flex: 1;
  }
  .ticket-button {
    height: 30px;
    line-height: 30px;
    margin-left: 20px;
    border-radius: 4px;
    padding: 0 10px;
    background-color: #fafafa;
    font-size: 14px;
    font-weight: bold;
    color: #1D6AFE;

    &.expired {
      color: #ADADAD;
      cursor: default;
    }
  }
</style>

<template lang="pug">
  section.store-tickets-container
    nav.nav
      button.back-button(@click="$router.back()")
      h1.title 구입한 티켓들
    .contents
      .ticket-item(v-for="ticket in tickets", :key="ticket._id")
        .ticket-item-content
          product-list-item(
            :image="ticket.itemImage",
            :brandName="ticket.itemBrandName",
            :name="ticket.itemName",
          )
        button.ticket-button.expired(v-if="expiredTicketsMap[ticket._id]") 만료됨
        button.ticket-button(v-else, @click="goToResending(ticket._id)") 재발송
</template>

<script>
import moment from 'moment';
import ProductListItem from './components/ProductListItem';

const DUMMY_TICKETS = [
  {
    _id: '1',
    itemId: '1',
    itemBrandName: '스타벅스',
    itemImage: 'https://file2.nocutnews.co.kr/newsroom/image/2018/03/15/20180315163346993745_0_763_677.jpg',
    itemName: '아이스 아메리카노 Tall',
    paid: 4100,
    expire: '2021-05-08T07:51:08.413Z',
  },
  {
    _id: '2',
    itemId: '2',
    itemBrandName: '스타벅스',
    itemImage: 'https://file2.nocutnews.co.kr/newsroom/image/2018/03/15/20180315163346993745_0_763_677.jpg',
    itemName: '아이스 아메리카노 Tall',
    paid: 4100,
    expire: '2021-05-02T07:51:08.413Z',
  },
  {
    _id: '3',
    itemId: '3',
    itemBrandName: '스타벅스',
    itemImage: 'https://file2.nocutnews.co.kr/newsroom/image/2018/03/15/20180315163346993745_0_763_677.jpg',
    itemName: '아이스 아메리카노 Tall',
    paid: 4100,
    expire: '2021-05-08T07:51:08.413Z',
  },
];

export default {
  components: {
    ProductListItem,
  },
  computed: {
    expiredTicketsMap() {
      const map = {};
      this.tickets.forEach((ticket) => {
        const now = moment();
        map[ticket._id] = now.diff(moment(ticket.expire)) > 0;
      });
      return map;
    },
  },
  data() {
    return {
      tickets: null,
    };
  },
  mounted() {
    // TODO: tickets 정보 가져오기 api
    this.tickets = DUMMY_TICKETS;
  },
  methods: {
    goToResending(ticketId) {
      this.$router.push({ path: '/store/resend-ticket', query: { ticketId } });
    },
  },
};
</script>
