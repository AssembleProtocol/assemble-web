<style lang="less" scoped>

</style>

<template lang="pug">
  section.store-order-complete-container
    nav.nav
      button.close-button(@click="$router.back()")
      h1.title 구입이 완료되었습니다!
    .contents
      product-list-item
      .invoice-box
        .form-group
          p.label 받는 번호
          p.value 01095339662
        hr.divider
        .form-group
          p.label 보유 포인트
          p.value 4,100 P
        .form-group
          p.label 상품 가격
          p.value - 4,100 P
        hr.divider
        .form-group
          p.label 합계
          p.value 0 P
</template>

<script>
import ProductListItem from './components/ProductListItem';

export default {
  components: {
    ProductListItem,
  },
};
</script>
