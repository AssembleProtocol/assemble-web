<style lang="less" scoped>
  .small-loading-list-item-container {
    display: flex;
    align-items: center;
    height: 80px;
    > * { flex-shrink: 0; }
  }
  .thumbnail {
    align-self: flex-start;
    width: 32px;
    height: 32px;
    margin-top: 10px;
    border-radius: 14px;
    border: 2px solid #EAECEE;
    background-color: #F7F8FA;
  }
  .contents {
    display: flex;
    flex: 1;
    align-items: center;
    height: 100%;
    margin-left: 20px;
    border-bottom: 1px solid #F7F8FA;
    > * { flex-shrink: 0; }
  }
  .title-wrapper {
    display: flex;
    flex: 1;
    flex-direction: column;
    justify-content: center;
    overflow: hidden;
  }
  .title {
    width: 98px;
    height: 14px;
    border-radius: 4px;
    background-color: #F7F8FA;
  }
  .subtitle {
    width: calc(100% - 30px);
    max-width: 230px;
    height: 14px;
    margin-top: 18px;
    border-radius: 4px;
    background-color: #F7F8FA;
  }
  .point {
    width: 30px;
    height: 16px;
    margin-left: 10px;
    border-radius: 4px;
    background-color: #E1EBFF;
  }
</style>

<template lang="pug">
  .small-loading-list-item-container
    .thumbnail
    .contents
      .title-wrapper
        .title
        .subtitle
      .point
</template>

<script>
export default {
};
</script>
