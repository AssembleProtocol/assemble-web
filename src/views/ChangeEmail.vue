<style lang="less" scoped>
  .change-email-container {
    padding: 0 20px;
  }
  .nav {
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
  form {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
  }
  .input {
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
    &:disabled {
      color: #707C8D;
      background-color: #E7E9EF;
    }
  }
  .info-description {
    max-width: 500px;
    width: 100%;
    margin-top: 10px;
    font-size: 14px;
    line-height: 200%;
    opacity: 0.6;
    color: #48596D;
  }
  .submit-button {
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
  @media only screen and (min-width: 768px) {
    .change-email-container {
      padding: 0;
    }
    .nav {
      position: inherit;
      height: 120px;
      padding: 0 60px;
      background-color: transparent;
    }
    .back-button {
      top: 48px;
    }
    .contents {
      margin: 0 auto;
      padding: 20px;
    }
  }
</style>

<template lang="pug">
  section.change-email-container
    header.nav
      button.back-button(@click="goBack")
    .contents.assemble-section
      h1.form-title 이메일 변경하기
      form(@submit.prevent="submit")
        input.input(placeholder="새 이메일 주소", type="email", v-model="email", :disabled="verificationToken")
        input.input(placeholder="계정 비밀번호", type="password", v-model="password", :disabled="verificationToken")
        input.input(v-if="verificationToken", placeholder="인증코드", v-model="pinCode")
      p.info-description(v-if="verificationToken") 메일함을 확인해 인증코드를 확인하고 입력해주세요. 만약 받지 못했다면, 스팸메일함을 확인해보거나 재발송을 시도해 보세요. 인증이 완료될 때까지 이 창을 닫지 마세요.
      button.submit-button(v-if="!verificationToken", @click="send") 다음
      button.submit-button(v-else, @click="submit") 인증하기
      button.resend(v-if="verificationToken", @click="send") 인증코드 재발송
</template>

<script>
export default {
  data() {
    return {
      email: null,
      password: null,
      pinCode: '',
      verificationToken: null,
    };
  },
  methods: {
    goBack() {
      this.$router.back();
    },
    async send() {
      try {
        const { data } = await this.$http.post('/verification-emails', { email: this.email });
        const { verificationToken } = data;
        this.verificationToken = verificationToken;
        this.$toast('인증코드가 발송 되었습니다');
      } catch (e) {
        if (!e.response || !e.response.data) return;
        this.$toast(e.response.data.message);
      }
    },
    async submit() {
      try {
        await this.$http.put('/users/me/email', {
          verificationToken: this.verificationToken,
          pinCode: this.pinCode,
          password: this.password,
        });
        await this.$store.dispatch('fetchMe');
        this.$toast('인증이 완료되었습니다');
        this.$router.push('/setting');
      } catch (e) {
        if (!e.response || !e.response.data) return;
        this.$toast(e.response.data.message);
      }
    },
  },

};
</script>
