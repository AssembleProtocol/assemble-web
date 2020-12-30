<style lang="less" scoped>
  .email-authentication {
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
    max-width: 500px;
    width: 100%;
    margin-top: 40px;
    font-weight: bold;
    font-size: 24px;
    line-height: 160%;
    color: #1F2E44;
  }

  .account-info {
    margin-top: 10px;
  }

  .info {
    max-width: 500px;
    width: 100%;
    font-size: 14px;
    line-height: 200%;
    opacity: 0.6;
    color: #48596D;
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

  .resend {
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
  section.email-authentication
    .header
      .assemble-logo
    .content
      h1.title 이메일 인증 필요
      .account-info
        p.info 포인트와 ASM을 안전하게 보관하고, 사용하려면 계정 이메일에 대한 인증이 필요합니다. 인증 메일을 확인해주세요. 만약 받지 못했다면, 스팸메일함을 확인해보거나 재발송을 시도해 보세요.
      button.account(@click="submit") 인증 확인하기
      button.resend 인증메일 재발송
</template>

<script>
export default {
  data() {
    return {
      from: '',
    };
  },
  mounted() {
    this.from = this.$route.query.from;
  },
  methods: {
    submit() {
      if (this.from === 'signup-to-connecting') {
        this.$router.push({
          path: '/connecting',
          query: this.$route.query,
        });
      } else if (this.from === 'signup') {
        // TODO: 로그인처리
        this.$router.push('/');
      }
    },
  },
};
</script>
