<style lang="less" scoped>
  .small-list-item-container {
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
    border-radius: 50%;
    border: 1px solid #F7F8FA;
    background-size: cover;
    background-repeat: no-repeat;
    &.exchange {
      background-image: url(~@/assets/asm-exchange.png);
    }
    &.clubpass {
      background-image: url(~@/assets/clubpass.png);
    }
  }
  .contents {
    display: flex;
    width: calc(100% - 52px);
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
    margin-right: 10px;
    overflow: hidden;
  }
  .title {
    display: flex;
    align-items: center;
    font-size: 16px;
    line-height: 32px;
  }
  .title-suffix {
    margin-left: 10px;
    font-size: 12px;
    color: rgba(157,169,184,.6);
  }
  .subtitle {
    color: rgba(72,89,109,.6);
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    font-size: 14px;
    line-height: 28px;
  }
  .suffix {
    margin-left: 10px;
  }
</style>

<template lang="pug">
  .small-list-item-container(:class="[size]")
    .thumbnail(:class="[appId]")
    .contents
      .title-wrapper
        h2.title {{ title }}#[span.title-suffix(v-if="titleSuffix") {{ titleSuffix | displayDate }}]
        p.subtitle {{ subtitle }}
      slot(name="suffix")
</template>

<script>
import moment from 'moment';

moment.locale('ko');

export default {
  props: {
    size: { type: String, default: 'default' }, // 'default', 'small'
    appId: { type: String, default: '' },
    title: { type: String, default: '' },
    subtitle: { type: String, default: '' },
    titleSuffix: { type: String, default: '' },
  },
  filters: {
    displayDate(date) {
      return moment(date).fromNow();
    },
  },
};
</script>
