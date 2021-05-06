<style lang="less" scoped>
  .product-list-item-container {
    display: flex;
    align-items: center;
  }
  .img-wrapper {
    position: relative;
    width: 60px;
    height: 60px;
  }
  .img {
    width: 60px;
    height: 60px;
    background-size: cover;
    background-repeat: no-repeat;
  }
  .img-overlay {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(0deg, rgba(0, 0, 0, 0.02), rgba(0, 0, 0, 0.02));
    z-index: 2;
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
      .img(:style="{ backgroundImage: image ? `url(${image})`: '' }")
      .img-overlay
    .contents
      p.brand-name {{ brandName }}
      p.name {{ name }}
</template>

<script>
export default {
  props: {
    image: { type: String },
    brandName: { type: String },
    name: { type: String },
  },
};
</script>
