<style lang="less" scoped>
  .exchange-center-exchange-container {
    color: #F7F8FA;
  }
  .header {
    display: flex;
    align-items: center;
    margin-top: 20px;
    padding: 0 20px;
  }
  .header-title {
    color: #F7F8FA;
    font-size: 24px;
    line-height: 38px;
  }
  .contents {
    margin-top: 20px;
    padding: 0 20px;
  }
  .form-group {
    display: flex;
    align-items: center;
    justify-content: space-between;
    &:not(:first-child) {
      margin-top: 20px;
    }
  }
  .label {
    font-size: 18px;
    font-weight: bold;
    line-height: 55px;
    color: rgba(214, 218, 224, .6);
  }
  .value {
    max-width: 120px;
    font-size: 18px;
    font-weight: bold;
    line-height: 55px;
    color: #F7F8FA;
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
  }
  .divier {
    width: 100%;
    height: 1px;
    margin: 20px 0;
    border: 0;
    background-color: #C4C4C4;
  }
  .subimt-button {
    width: 100%;
    height: 55px;
    margin-top: 20px;
    border-radius: 9px;
    background-color: #2E75FF;
    line-height: 55px;
    text-align: center;
    color: #F7F8FA;
    font-weight: bold;
  }
</style>

<template lang="pug">
  section.exchange-center-exchange-container
    header.header
      h1.header-title 포인트 -> ASM 확인하기
    .contents
      .form-group
        p.label 받는 주소
        p.value 내 교환소 지갑
      .form-group
        p.label 지불 포인트
        p.value {{ from }} P
      hr.divier
      .form-group
        p.label 교환 ASM
        p.value {{ to }} ASM
      button.subimt-button(@click="goToResult") 교환하기
</template>

<script>
import { mapState } from 'vuex';

export default {
  computed: {
    ...mapState({
      from: (state) => state.route.query.from,
      to: (state) => state.route.query.to,
    }),
  },
  mounted() {
    this.$emit('hideNavPoint');
  },
  destroyed() {
    this.$emit('showNavPoint');
  },
  methods: {
    async goToResult() {
      await this.$http.post('/wallet/exchange/point-to-asm', { point: this.from });
      this.$router.push({
        path: '/exchange-center/exchange-result',
        query: this.$route.query,
      });
    },
  },
};
</script>
