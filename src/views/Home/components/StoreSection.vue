<style lang="less" scoped>
  .store-container {
    padding: 20px 0;
  }
  .nav {
    display: flex;
    justify-content: space-between;
    padding: 0 20px;
    background-color: #fff;
  }
  .link-button {
    font-size: 14px;
    font-weight: bold;
    line-height: 28px;
    color: #6096FF;
  }
  .notice {
    display: flex;
    align-items: center;
    width: calc(100% - 20px);
    height: 78px;
    margin: 20px 0 0 10px;
    padding: 0 20px;
    border: 1px solid #D8E5FF;
    border-radius: 8px;
    background-color: #EDF3FF;
  }
  .notice-description {
    flex: 1;
    font-size: 12px;
    line-height: 19px;
    font-weight: bold;
    color: #48596D;
  }
  .notice-close-button {
    width: 16px;
    height: 16px;
    background-image: url(~@/assets/store-close.svg);
    background-repeat: no-repeat;
    background-size: cover;
  }
  .tab-list {
    display: flex;
    flex-wrap: nowrap;
    height: 40px;
    margin-top: 20px;
    overflow-x: auto;
    overflow-y: hidden;
    background-color: #fff;
    & > * {
      flex-shrink: 0;
    }
  }
  .tab-item {
    height: 40px;
    margin: 0 10px;
    padding: 0 20px;
    border-radius: 18px;
    line-height: 40px;
    background-color: #FAFAFA;
    font-weight: bold;
    cursor: pointer;
    &.active {
      background-color: #4886FD;
      color: #fafafa;
    }
  }
  .contents {
    display: flex;
    flex-wrap: wrap;
    margin: 0 5px;
  }
  .product-card-wrapper {
    width: calc((100% - 20px) / 2);
    margin: 20px 5px;
  }
</style>

<template lang="pug">
  section.store-container
    nav.nav
      img(src="~@/assets/store-logo.svg", height="36")
      router-link.link-button(to="/store/tickets") 구매 내역
    .notice(v-if="!noticeClosed")
      .notice-description.
        모든 상품을 가지고 있는 어셈블 포인트로#[br]
        간단히 구매할 수 있어요!
      button.notice-close-button(@click="closeNotice")
    ul.tab-list
      li.tab-item.active 패션
      li.tab-item 뷰티
      li.tab-item 리빙
      li.tab-item 푸드
      li.tab-item 컬쳐
      li.tab-item 쇼크
    .contents
      router-link.product-card-wrapper(
        v-for="marketItem in marketItems",
        :to="`/store/products/${marketItem._id}`",
      )
        product-card(
          :brandName="marketItem.brandName",
          :name="marketItem.name",
          :price="marketItem.price",
        )
</template>

<script>
import ProductCard from './ProductCard';

const DUMMY_MARKET_ITEMS = [
  { _id: '1', brandName: 'CU', name: 'CU 모바일 상품권 1천원권', price: 1000 },
  { _id: '2', brandName: 'CU', name: 'CU 모바일 상품권 1천원권', price: 1000 },
  { _id: '3', brandName: 'CU', name: 'CU 모바일 상품권 1천원권', price: 1000 },
];

export default {
  components: {
    ProductCard,
  },
  data() {
    return {
      noticeClosed: false,
      marketItems: null,
    };
  },
  mounted() {
    this.noticeClosed = this.$localStorage.get('storeNoticeClosed');
    // TODO: market items 가져오는 api
    this.marketItems = DUMMY_MARKET_ITEMS;
  },
  methods: {
    closeNotice() {
      this.noticeClosed = true;
      this.$localStorage.set('storeNoticeClosed', true);
    },
  },
};
</script>
