<style lang="less" scoped>
  .email-verification {
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
    align-items: flex-start;
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
  .form {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
  }
  .input {
    display: inline-block;
    margin-top: 20px;
    padding-left: 10px;
    max-width: 500px;
    width: 100%;
    height: 55px;
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
      border:1px solid #1D6AFE;;
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
</style>

<template lang="pug">
  section.email-verification
    .header
      .assemble-logo
    .content
      h1.title 이메일 인증 필요
      form.form(@submit.prevent="submit")
        p.info-description 포인트와 ASM을 안전하게 보관하고, 사용하려면 계정 이메일에 대한 인증이 필요합니다. 메일함을 확인해 인증코드를 확인하고 입력해주세요. 만약 받지 못했다면, 스팸메일함을 확인해보거나 재발송을 시도해 보세요. 인증이 완료될 때까지 이 창을 닫지 마세요.
        input.input(placeholder="이메일", type="email", :value="email", disabled)
        input.input(v-if="verificationToken", placeholder="인증코드", type="number" v-model="pinCode")
      button.submit-button(v-if="!verificationToken", @click="send") 인증코드 발송
      button.submit-button(v-else, @click="submit") 인증하기
      button.resend(@click="send") 인증코드 재발송
</template>

<script>
import { mapState } from 'vuex';

export default {
  computed: {
    ...mapState({
      email: (state) => state.route.query.email,
    }),
  },
  data() {
    return {
      from: '',
      pinCode: '',
      verificationToken: '',
    };
  },
  async mounted() {
    this.from = this.$route.query.from;
  },
  methods: {
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
        });
        await this.$store.dispatch('fetchMe');
        this.$toast('인증이 완료되었습니다');

        if (this.from === 'signup-to-connecting' || this.from === 'signin-to-connecting') {
          this.$router.push({ path: '/connecting', query: this.$route.query });
        } else {
          this.$router.push('/');
        }
      } catch (e) {
        if (!e.response || !e.response.data) return;
        this.$toast(e.response.data.message);
      }
    },
  },
};
</script>
