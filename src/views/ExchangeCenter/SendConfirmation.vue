<style lang="less" scoped>
  .exchange-center-send-confirmation-container {
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
  .description {
    margin-top: 20px;
    color: rgba(214, 218, 224, 0.6);
    font-size: 14px;
    line-height: 28px;
  }
</style>

<template lang="pug">
  section.exchange-center-send-confirmation-container
    header.header
      h1.header-title 최종 확인하기
    .contents
      .form-group
        p.label 받는 주소
        p.value 0x2354...F2D0
      .form-group
        p.label 수량
        p.value 0.4 ASM
      .form-group
        p.label 수수료
        p.value 0.00363 ASM
      hr.divier
      .form-group
        p.label 합계
        p.value 0.40363 ASM
      button.subimt-button 보내기
      p.description ASM을 보낼 때 소요되는 수수료는 네트워크 상황에 따라 달라질 수 있습니다.  이 수수료는 편의를 위해 어셈블에 의하여 최적값이 자동으로 계산되지만, 어셈블이 부과하는 것은 아닙니다. 암호화폐의 기술적 특성에 기인합니다.
</template>

<script>
export default {
};
</script>
