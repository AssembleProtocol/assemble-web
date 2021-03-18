<style lang="less" scoped>
  .product-list-item-container {
    display: flex;
    align-items: center;
  }
  .img-wrapper {
    width: 60px;
    height: 60px;
    background: linear-gradient(0deg, rgba(0, 0, 0, 0.02), rgba(0, 0, 0, 0.02));
  }
  .img {
    width: 60px;
    height: 60px;
  }
  .contents {
    flex: 1;
    margin-left: 20px;
    font-size: 14px;
    line-height: 25px;
  }
  .brand-name {
    font-weight: bold;
  }

</style>

<template lang="pug">
  .product-list-item-container
    .img-wrapper
      .img
    .contents
      p.brand-name 스타벅스
      p.name 아이스 아메리카노 Tall
</template>

<script>
export default {
};
</script>
