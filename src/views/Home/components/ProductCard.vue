<style lang="less" scoped>
  .img-ratio-wrapper {
    position: relative;
    padding-top: 100%;
  }
  .img {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-repeat: no-repeat;
    background-size: cover;
    background-position: center;
    z-index: 1;
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
    letter-spacing: 0.05em;
  }
</style>

<template lang="pug">
  .product-card-container
    .img-ratio-wrapper
      .img(
        v-if="showingImage",
        :style="{ backgroundImage: showingImage ? `url(${showingImage})`: '' }",
      )
      .img-overlay
    p.brand-name {{ brandName }}
    p.product-name {{ name }}
    p.product-price {{ price | displayNumber }} P
</template>

<script>
export default {
  props: {
    image: { type: String },
    brandIcon: { type: String },
    brandName: { type: String },
    name: { type: String },
    price: { type: Number },
  },
  filters: {
    displayNumber(number) {
      return Number(number).toLocaleString();
    },
  },
  computed: {
    showingImage() {
      if (this.image) return this.image;
      if (this.brandIcon) return this.brandIcon;
      return null;
    },
  },
};
</script>
