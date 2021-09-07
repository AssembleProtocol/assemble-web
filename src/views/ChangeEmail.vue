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
      padding: 0 80px;
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
      h1.form-title {{ $t('title') }}
      form(@submit.prevent="submit")
        input.input(:placeholder="$t('newEmail')", type="email", v-model="email", :disabled="verificationToken")
        input.input(:placeholder="$t('password')", type="password", v-model="password", :disabled="verificationToken")
        input.input(v-if="verificationToken", placeholder="인증코드", v-model="pinCode")
      p.info-description(v-if="verificationToken") {{ $t('description') }}
      button.submit-button(v-if="!verificationToken", @click="send") {{ $t('next') }}
      button.submit-button(v-else, @click="submit") {{ $t('submit') }}
      button.resend(v-if="verificationToken", @click="send") {{ $t('resend') }}
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
        this.$router.push(this.$localePath('/setting'));
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
    "title": "이메일 변경하기",
    "newEmail": "새 이메일 주소",
    "password": "계정 비밀번호",
    "description": "메일함을 확인해 인증코드를 확인하고 입력해주세요. 만약 받지 못했다면, 스팸메일함을 확인해보거나 재발송을 시도해 보세요. 인증이 완료될 때까지 이 창을 닫지 마세요.",
    "next": "다음",
    "submit": "인증하기",
    "resend": "인증코드 재발송"
  },
  "en": {
    "title": "Change password",
    "newEmail": "new email",
    "password": "password",
    "description": "Please check your mailbox and enter the verification code. If you haven't received it, check your spam mailbox or try to resend it. Do not close this window until authentication is complete.",
    "next": "next",
    "submit": "authenticate",
    "resend": "resend"
  },
  "ja": {
    "title": "暗証番号変更",
    "newEmail": "新しいメールアドレス",
    "password": "パスワード",
    "description": "メールボックスを確認して認証コードを確認して入力してください。 もし届かなかったら、迷惑メールボックスを確認したり、再送したりしてみてください。 認証が完了するまでこのウィンドウを閉めないでください。",
    "next": "次ぎ",
    "submit": "認証する",
    "resend": "認証コード再送"
  },
  "cn": {
    "title": "更改密码",
    "newEmail": "新建电子邮件地址",
    "password": "密码",
    "description": "请确认邮箱并输入验证码。 如果你没收到,请确认一下你的垃圾邮件箱,或者尝试重新发送. 在验证完成前不要关闭此窗口 。",
    "next": "下一个",
    "submit": "认证",
    "resend": "重新发送验证码"
  }
}
</i18n>
