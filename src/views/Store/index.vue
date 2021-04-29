<style lang="less" scoped>
  @fixed-bottom-notice-height: 78px;

  .nav {
    position: sticky;
    top: 0;
    display: flex;
    align-items: center;
    height: 80px;
    padding: 0 20px;
    z-index: 999;
    background-color: #fff;
  }
  .nav-button {
    width: 24px;
    height: 24px;
    background-repeat: no-repeat;
    background-size: cover;
    &.back {
      background-image: url('~@/assets/back-button.png');
    }
    &.cart {
      background-image: url('~@/assets/bascket.svg');
    }
  }
  .title {
    display: flex;
    align-items: center;
    justify-content: center;
    flex: 1;
    height: 100%;
  }
  .title-text {
    margin-left: 10px;
    font-size: 16px;
    line-height: 26px;
  }
  .tab-list {
    position: sticky;
    top: 80px;
    display: flex;
    flex-wrap: nowrap;
    height: 40px;
    overflow-x: auto;
    overflow-y: hidden;
    z-index: 999;
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
  .fixed-bottom-notice {
    position: sticky;
    bottom: 10px;
    display: flex;
    align-items: center;
    width: calc(100% - 20px);
    height: @fixed-bottom-notice-height;
    margin-left: 10px;
    padding: 0 20px;
    border: 1px solid #D8E5FF;
    border-radius: 8px;
    background-color: #EDF3FF;
    z-index: 999;
  }
  .fixed-bottom-notice-description {
    flex: 1;
    font-size: 12px;
    line-height: 19px;
    font-weight: bold;
    color: #48596D;
  }
  .fixed-bottom-notice-close-button {
    width: 16px;
    height: 16px;
    background-image: url(~@/assets/store-close.svg);
    background-repeat: no-repeat;
    background-size: cover;
  }
</style>

<template lang="pug">
  section.store-container
    nav.nav
      button.nav-button.back(@click="$router.back()")
      h1.title
        img(src="~@/assets/store-logo.svg", height="16")
        p.title-text 쇼핑하기
      button.nav-button.cart(@click="goToTickets")
    ul.tab-list
      li.tab-item.active 패션
      li.tab-item 뷰티
      li.tab-item 리빙
      li.tab-item 푸드
      li.tab-item 컬쳐
    .contents
      router-link.product-card-wrapper(to="/store/products/123")
        product-card
      router-link.product-card-wrapper(to="/store/products/123")
        product-card
      router-link.product-card-wrapper(to="/store/products/123")
        product-card
      router-link.product-card-wrapper(to="/store/products/123")
        product-card
      router-link.product-card-wrapper(to="/store/products/123")
        product-card
      router-link.product-card-wrapper(to="/store/products/123")
        product-card
      router-link.product-card-wrapper(to="/store/products/123")
        product-card
      router-link.product-card-wrapper(to="/store/products/123")
        product-card
      router-link.product-card-wrapper(to="/store/products/123")
        product-card
      router-link.product-card-wrapper(to="/store/products/123")
        product-card
      router-link.product-card-wrapper(to="/store/products/123")
        product-card
      router-link.product-card-wrapper(to="/store/products/123")
        product-card
      router-link.product-card-wrapper(to="/store/products/123")
        product-card
      router-link.product-card-wrapper(to="/store/products/123")
        product-card
      router-link.product-card-wrapper(to="/store/products/123")
        product-card
    .fixed-bottom-notice
      .fixed-bottom-notice-description.
        모든 상품을 가지고 있는 어셈블 포인트로#[br]
        간단히 구매할 수 있어요!
      button.fixed-bottom-notice-close-button
</template>

<script>
import ProductCard from './components/ProductCard';

export default {
  components: {
    ProductCard,
  },
  methods: {
    goToTickets() {
      this.$router.push('/store/tickets');
    },
  },
};
</script>
