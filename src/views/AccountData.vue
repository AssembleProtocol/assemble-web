<style lang="less" scoped>
  .AccountLink-wrapper {
    padding: 0 20px;
  }

  .header {
    width: 100%;
    height: 80px;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .assemble-logo {
    width: 201px;
    height: 32px;
    background-image: url('~@/assets/assemble-logo.png');
    background-repeat: no-repeat;
    background-size: cover;
  }

  .content {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .title {
    margin-top: 40px;
    max-width: 500px;
    width: 100%;
    font-weight: bold;
    font-size: 24px;
    line-height: 160%;
    color: #1F2E44;
  }

  .account-info {
    margin-top: 10px;
  }

  .text {
    font-size: 14px;
    line-height: 200%;
    opacity: 0.6;
    color: #48596D;
  }

  .info {
    max-width: 500px;
    width: 100%;
  }

  .account {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 20px;
    max-width: 500px;
    width: 100%;
    height: 55px;
    font-weight: bold;
    font-size: 18px;
    line-height: 55px;
    border-radius: 9px;
    color: #F7F8FA;
    background-color: #1D6AFE;
  }

  .another {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 20px;
    width: 100%;
    font-weight: bold;
    font-size: 14px;
    line-height: 200%;
    color: #1D6AFE;
  }
</style>

<template lang="pug">
  section.AccountLink-wrapper
    .header
      .assemble-logo

    .content
      .title 클럽패스와 연결하기

      .account-info
        .club-pass.text 클럽패스 #[strong {{ id }}]
        .assemble.text 어셈블 #[strong {{ name }}] #[strong {{ email }}]
        .account-link.text 두 계정을 연결하고 있습니다.
        .info.text 연결이 완료되면 클럽패스와 어셈블 및 클럽패스의 계정 공개 정보, 어셈블 포인트 이력과 합계를 함께 공유합니다.
      button.account 연결하기
      router-link(to="/account").another 다른 계정으로 연결하기
</template>

<script>
export default {

  data() {
    return {
      id: 'NANAN',
      name: '조영규',
      email: 'capt.youngkyu@gmail.com',
    };
  },

};
</script>
