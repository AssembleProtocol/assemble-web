<style lang="less" scoped>
  .img-ratio-wrapper {
    position: relative;
    padding-top: 100%;
    background: linear-gradient(0deg, rgba(0, 0, 0, 0.02), rgba(0, 0, 0, 0.02));
  }
  .img {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }
  .brand-name {
    margin-top: 10px;
    font-size: 12px;
    font-weight: bold;
    line-height: 22px;
  }
  .product-name {
    font-size: 12px;
    line-height: 22px;
  }
  .product-price {
    font-size: 16px;
    font-weight: bold;
    line-height: 29px;
  }
</style>

<template lang="pug">
  .product-card-container
    .img-ratio-wrapper
      .img
    p.brand-name CU
    p.product-name CU 모바일 상품권 1천원권
    p.product-price 1,000 P
</template>

<script>
export default {
};
</script>
