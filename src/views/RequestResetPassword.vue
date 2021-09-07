<style lang="less" scoped>
  .request-reset-password-container {
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
  @media only screen and (min-width: 768px) {
    .request-reset-password-container {
      padding: 0;
    }
    .nav {
      position: inherit;
      height: 120px;
      padding: 0 80px;
      background-color: transparent;
    }
    .contents {
      margin: 0 auto;
      padding: 20px;
    }
  }
</style>

<template lang="pug">
  section.request-reset-password-container
    header.nav
      button.back-button(@click="goBack")
    .contents.assemble-section
      h1.form-title {{ $t('title') }}
      p.description {{ $t('description') }}
      form(@submit.prevent="submit")
        input.password(:placeholder="$t('email')", type="email", v-model="email")
        button.submit-button(type="submit") {{ $t('submit') }}
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
        this.$router.push(this.$localePath('/signin'));
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
    "title": "비밀번호 재설정하기",
    "description": "존재하는 이메일 주소라면, 해당 이메일 주소 계정의 비밀번호를 재설정 할 수 있는 링크가 전송될 것입니다.",
    "email": "이메일 주소",
    "submit": "재설정 메일 요청"
  },
  "en": {
    "title": "Reset Password",
    "description": "If an email address exists, a link will be sent to reset the password for that email address account.",
    "email": "e-mail address",
    "submit": "Reset mail request"
  },
  "ja": {
    "title": "暗証番号の再設定",
    "description": "存在するメールアドレスであれば、該当メールアドレスアカウントのパスワードを再設定できるリンクが送信されます。",
    "email": "イーメールアドレス",
    "submit": "再設定メール要請"
  },
  "cn": {
    "title": "重新设置密码",
    "description": "如果您是已有的邮箱地址， 将会发送重新设置该邮箱地址账户密码的链接 。",
    "email": "电子邮件地址",
    "submit": "请求重置邮件"
  }
}
</i18n>
