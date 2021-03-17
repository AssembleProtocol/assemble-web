<style lang="less" scoped>
  .transaction-item-container {
    position: relative;
    display: flex;
    height: 80px;
    padding: 10px 20px 10px 10px;

    &::after {
      content: "";
      display: block;
      position: absolute;
      bottom: 0;
      left: 52px;
      height: 1px;
      width: calc(100% - 52px);
      background-color: #314662;
    }
  }
  .center {
    flex: 1;
    margin-left: 10px;
  }
  .header {
    display: flex;
    align-items: center;
  }
  .title {
    line-height: 32px;
  }
  .date {
    margin-left: 10px;
    font-size: 12px;
    line-height: 24px;
    color: #6096FF;
  }
  .address {
    font-size: 14px;
    line-height: 28px;
    color: #c1c4ca;
  }
  .point {
    margin: 20px 0 0 10px;
    text-align: right;
    font-size: 14px;
    line-height: 21px;
    font-weight: bold;
  }
</style>

<template lang="pug">
  .transaction-item-container
    //- img.icon(src="~@/assets/transaction-post.svg", width="32", height="32")
    img.icon(src="~@/assets/transaction-receive.svg", width="32", height="32")
    .center
      .header
        strong.title 보냄
        .date 1일전
      p.address 받는 주소 0x2354...F2D0
    .point - 0.0000042 ASM
</template>

<script>
export default {
  props: {
    transaction: { type: Object, default: null },
  },
};
</script>
