<style lang="less" scoped>
  .store-container {
    padding: 20px 0;
  }
  .nav {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 20px;
    background-color: #fff;
  }
  .link-button {
    font-size: 14px;
    font-weight: bold;
    line-height: 28px;
    color: #4886FD;
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
    position: sticky;
    top: 80px;
    display: flex;
    flex-wrap: nowrap;
    height: 50px;
    margin-top: 20px;
    padding-bottom: 10px;
    overflow-x: auto;
    overflow-y: hidden;
    background-color: #fff;
    z-index: 999;
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
    margin: -10px 5px 0 5px;
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
      router-link.link-button(to="/store/tickets") 구입 내역
    .notice(v-if="!noticeClosed")
      .notice-description.
        모든 상품을 가지고 있는 어셈블 포인트로#[br]
        간단히 구매할 수 있어요!
      button.notice-close-button(@click="closeNotice")
    ul.tab-list
      li.tab-item(
        v-for="category in categories",
        :key="category",
        :class="{ active: activeCategory === category }",
        @click="selectCategory(category)",
      ) {{ category }}
    .contents
      router-link.product-card-wrapper(
        v-for="marketItem in marketItems",
        :to="`/store/products/${marketItem._id}`",
      )
        product-card(
          :image="marketItem.image",
          :brandIcon="marketItem.brandIcon",
          :brandName="marketItem.brandName",
          :name="marketItem.name",
          :price="marketItem.price",
        )
</template>

<script>
import gql from 'graphql-tag';
import ProductCard from './ProductCard';

export default {
  components: {
    ProductCard,
  },
  data() {
    return {
      activeCategory: '',
      noticeClosed: false,
    };
  },
  apollo: {
    categories: gql`{ categories }`,
    marketItems: {
      query: gql`query ($offset: Int!, $category: String!) {
        marketItems(offset: $offset, limit: 200, category: $category) {
          _id
          name
          brandName
          brandIcon
          image
          price
        }
      }`,
      variables() {
        return {
          offset: 0,
          limit: 200,
          category: this.activeCategory,
        };
      },
    },
  },
  mounted() {
    this.noticeClosed = this.$localStorage.get('storeNoticeClosed');
  },
  methods: {
    closeNotice() {
      this.noticeClosed = true;
      this.$localStorage.set('storeNoticeClosed', true);
    },
    selectCategory(category) {
      this.activeCategory = category;
    },
  },
};
</script>
