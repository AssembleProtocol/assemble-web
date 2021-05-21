<style lang="less" scoped>
  .request-reset-password-container {
    padding: 0 20px;
  }
  .header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    position: sticky;
    top: 0;
    left: 0;
    width: 100%;
    height: 80px;
    background-color: #ffffff;
  }
  .back-button {
    width: 24px;
    height: 24px;
    background-image: url('~@/assets/back-button.png');
    background-repeat: no-repeat;
    background-size: cover;
  }
  .contents {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 20px 0;
  }
  .form-title {
    max-width: 500px;
    width: 100%;
    font-weight: bold;
    font-size: 24px;
    line-height: 160%;
    color: #1F2E44;
  }
  .description {
    margin-top: 10px;
    font-size: 14px;
    line-height: 28px;
    color: rgba(72, 89, 109, .6);
  }
  form {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
  }
  input {
    margin-top: 20px;
    padding-left: 10px;
    max-width: 500px;
    width: 100%;
    height: 53px;
    font-weight: bold;
    font-size: 18px;
    line-height: 55px;
    border: 1px solid #F7F8FA;
    border-radius: 9px;
    color: #1F2E44;
    background-color: #F7F8FA;

    &::placeholder {
      font-weight: bold;
      font-size: 18px;
      line-height: 55px;
      color: #C5CAD0;
    }
    &:focus {
      outline: none !important;
      border:1px solid #1D6AFE;
    }
  }
  .submit-button {
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
    text-align: center;
  }
</style>

<template lang="pug">
  section.request-reset-password-container
    header.header
      button.back-button(@click="goBack")
    .contents
      h1.form-title 비밀번호 재설정하기
      p.description 존재하는 이메일 주소라면, 해당 이메일 주소 계정의 비밀번호를 재설정 할 수 있는 링크가 전송될 것입니다.
      form(@submit.prevent="submit")
        input.password(placeholder="이메일 주소", type="email", v-model="email")
        button.submit-button(type="submit") 재설정 메일 요청
</template>

<script>
export default {
  data() {
    return {
      email: null,
    };
  },
  methods: {
    goBack() {
      this.$router.back();
    },
    async submit() {
      try {
        await this.$http.post('/reset-password-emails', { email: this.email });
        this.$toast('보냈습니다! 메일함을 확인하세요.');
        this.$router.push('/signin');
      } catch (e) {
        if (!e.response || !e.response.data) return;
        this.$toast(e.response.data.message);
      }
    },
  },

};
</script>
