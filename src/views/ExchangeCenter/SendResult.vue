<style lang="less" scoped>
  .exchange-center-send-result-container {
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
    font-size: 18px;
    font-weight: bold;
    line-height: 55px;
    color: #F7F8FA;
  }
  .divier {
    width: 100%;
    height: 1px;
    margin: 20px 0;
    border: 0;
    background-color: #C4C4C4;
  }
  .description {
    margin-top: 20px;
    color: #D6DAE0;
    font-size: 14px;
    line-height: 28px;
  }
  .submit-button {
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
  .link-button-wrapper {
    display: flex;
    justify-content: center;
    margin-top: 20px;
  }
  .link-button {
    color: #2E75FF;
    line-height: 28px;
    font-weight: bold;
  }
</style>

<template lang="pug">
  section.exchange-center-send-result-container
    header.header
      h1.header-title 접수되었습니다
    .contents
      .form-group
        p.label 받는 주소
        p.value {{ displayAddress }}
      .form-group
        p.label 수량
        p.value {{ asm }} ASM
      //- .form-group
        p.label 수수료
        p.value 0.00363 ASM
      hr.divier
      .form-group
        p.label 합계
        p.value {{ asm }} ASM
      p.description ASM을 보내는 중입니다. 보통 몇 분 안에 끝나지만, 한 두시간이 걸릴 수도 있습니다. 이러한 지연은 암호화폐의 기술적 특성으로 발생됩니다.
      button.submit-button(@click="goToExchangeMain") 교환소로 돌아가기
      //- .link-button-wrapper
        a.link-button(href="#") Etherscan에서 진행 상황 보기
</template>

<script>
import { mapState } from 'vuex';

export default {
  computed: {
    ...mapState({
      address: (state) => state.route.query.address,
      asm: (state) => state.route.query.asm,
    }),
    displayAddress() {
      if (!this.address) return '';
      return `${this.address.slice(0, 6)}...${this.address.slice(-4)}`;
    },
  },
  mounted() {
    this.$emit('showNavClose');
    this.$emit('hideNavPoint');
  },
  destroyed() {
    this.$emit('hideNavClose');
    this.$emit('showNavPoint');
  },
  methods: {
    goToExchangeMain() {
      this.$emit('goExchangeHome');
    },
  },
};
</script>
