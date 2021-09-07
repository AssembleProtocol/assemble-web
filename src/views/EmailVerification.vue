<style lang="less" scoped>
  .email-verification-container {
    padding: 0 20px 80px 20px;
  }
  .nav {
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
  .contents {
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
  @media only screen and (min-width: 768px) {
    .email-verification-container {
      padding: 0;
    }
    .nav {
      height: 120px;
      padding: 0 60px;
    }
    .contents {
      margin: 0 auto;
      padding: 20px;
    }
    .title {
      margin-top: 0;
    }
  }
</style>

<template lang="pug">
  section.email-verification-container
    .nav
      .assemble-logo
    .contents.assemble-section
      h1.title {{ $t('title') }}
      form.form(@submit.prevent="submit")
        p.info-description {{ $t('description') }}
        input.input(:placeholder="$t('email')", type="email", :value="email", disabled)
        input.input(v-if="verificationToken", :placeholder="$t('pinCode')", type="number" v-model="pinCode")
      button.submit-button(v-if="!verificationToken", @click="send") {{ $t('requestPinCode') }}
      button.submit-button(v-else, @click="submit") {{ $t('submit') }}
      button.resend(@click="send") {{ $t('resend') }}
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
          this.$router.push({ path: this.$localePath('/connecting'), query: this.$route.query });
        } else {
          this.$router.push(this.$localePath('/'));
        }
      } catch (e) {
        if (!e.response || !e.response.data) return;
        this.$toast(e.response.data.message);
      }
    },
  },
};
</script>

<i18n>
{
  "ko": {
    "title": "이메일 인증 필요",
    "description": "포인트와 ASM을 안전하게 보관하고, 사용하려면 계정 이메일에 대한 인증이 필요합니다. 메일함을 확인해 인증코드를 확인하고 입력해주세요. 만약 받지 못했다면, 스팸메일함을 확인해보거나 재발송을 시도해 보세요. 인증이 완료될 때까지 이 창을 닫지 마세요.",
    "email": "이메일",
    "pinCode": "인증코드",
    "requestPinCode": "인증코드 발송",
    "submit": "인증하기",
    "resend": "인증코드 재발송"
  },
  "en": {
    "title": "Email authentication required",
    "description": "Authentication for account email is required to keep and use points and ASM securely. Please check your mailbox and enter the verification code. If you haven't received it, check your spam mailbox or try to resend it. Do not close this window until authentication is complete.",
    "email": "email",
    "pinCode": "pincode",
    "requestPinCode": "send pincode",
    "submit": "authenticate",
    "resend": "resend pincode"
  },
  "ja": {
    "title": "e-mail認証が必要",
    "description": "ポイントとASMを安全に保管し、使用するためにはアカウントメールに対する認証が必要です。 メールボックスを確認して認証コードを確認して入力してください。 もし届かなかったら、迷惑メールボックスを確認したり、再送したりしてみてください。 認証が完了するまでこのウィンドウを閉めないでください。",
    "email": "電子メール",
    "pinCode": "認証コード",
    "requestPinCode": "認証コード送信",
    "submit": "認証する",
    "resend": "認証コード再送"
  },
  "cn": {
    "title": "需要 e-mail 认证",
    "description": "安全保管并使用积分和ASM需要验证您的账户邮箱 。 请确认邮箱并输入验证码。 如果你没收到,请确认一下你的垃圾邮件箱,或者尝试重新发送. 在验证完成前不要关闭此窗口 。",
    "email": "电子邮件",
    "pinCode": "验证码",
    "requestPinCode": "发送验证码",
    "submit": "认证",
    "resend": "重新发送验证码"
  }
}
</i18n>
