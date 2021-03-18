<style lang="less" scoped>
  .list-item-container {
    display: flex;
    align-items: center;
    padding: 10px 0;
    > * { flex-shrink: 0; }

    &.small {
      .thumbnail {
        width: 32px;
        height: 32px;
      }
      .contents {
        width: calc(100% - 52px);
        height: 61px;
      }
      .title {
        line-height: 32px;
      }
      .subtitle {
        font-size: 14px;
        line-height: 28px;
      }
    }
  }
  .thumbnail {
    align-self: flex-start;
    width: 75px;
    height: 75px;
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
    width: calc(100% - 95px);
    height: 75px;
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
    line-height: 26px;
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
    font-size: 16px;
    line-height: 26px;
  }
  .suffix {
    margin-left: 10px;
  }
</style>

<template lang="pug">
  .list-item-container(:class="[size]")
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
