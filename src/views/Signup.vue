<style lang="less" scoped>
  .signup-container {
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
  .form-title {
    max-width: 500px;
    width: 100%;
    margin-top: 40px;
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
  .info {
    margin-top: 20px;
    max-width: 500px;
    width: 100%;
    font-size: 14px;
    line-height: 200%;
    opacity: 0.6;
    color: #48596D;
  }
  .join {
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
  .error-message {
    margin-top: 5px;
    font-weight: bold;
    font-size: 12px;
    line-height: 200%;
    text-align: center;
    color: #FF134C;
  }
  .member {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 20px;
    font-weight: bold;
    font-size: 14px;
    line-height: 200%;
    color: #1D6AFE;
  }
  @media only screen and (min-width: 768px) {
    .signup-container {
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
    .form-title {
      margin-top: 0;
    }
  }
</style>

<template lang="pug">
  section.signup-container
    .nav
      .assemble-logo
    .contents.assemble-section
      h1.form-title {{ $t('title') }}
      form(@submit.prevent="submit")
        input.name(:placeholder="$t('name')", type="text" v-model="form.name")
        input.email(:placeholder="$t('email')", type="email", v-model="form.email")
        input.password(:placeholder="$t('password')", type="password", v-model="form.password")
        button.join(type="submit") {{ $t('submit') }}
        p.error-message(v-if="error") {{ $t('errorMessage') }}
      locale-router-link(to="/signin").member {{ $t('signIn') }}
</template>

<script>
import { mapState } from 'vuex';

export default {
  computed: {
    ...mapState({
      me: (state) => state.me,
    }),
  },
  data() {
    return {
      form: {
        name: null,
        email: null,
        password: null,
      },
      error: false,
    };
  },
  methods: {
    async submit() {
      const nameValidity = !!this.form.name;
      const emailValidity = !!this.form.email;
      const passwordValidity = !!this.form.password;

      if (!nameValidity || !emailValidity || !passwordValidity) {
        this.error = true;
        return;
      }
      try {
        await this.$http.post('/users', {
          name: this.form.name,
          email: this.form.email,
          password: this.form.password,
        });
        const accessToken = await this.$store.dispatch('login', {
          email: this.form.email,
          password: this.form.password,
        });
        this.$localStorage.set('token', `${accessToken}`);
        this.$http.defaults.headers.common.Authorization = `Bearer ${accessToken}`;

        await this.$store.dispatch('fetchMe');
        if (!this.me.emailVerified) {
          this.$router.push({
            path: this.$localePath('/email-verification'),
            query: { email: this.me.email },
          });
          return;
        }
        this.$router.push(this.$localePath('/'));
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
    "title": "회원가입하기",
    "name": "이름",
    "email": "이메일",
    "password": "비밀번호",
    "submit": "회원가입",
    "errorMessage": "입력 정보들을 확인해주세요.",
    "signIn": "기존 회원인가요?"
  },
  "en": {
    "title": "Sign up",
    "name": "name",
    "email": "email",
    "password": "password",
    "submit": "sign up",
    "errorMessage": "Please check the input information.",
    "signIn": "Are you an existing member?"
  },
  "ja": {
    "title": "会員加入",
    "name": "お名前",
    "email": "パスワード",
    "password": "パスワード",
    "submit": "会員加入",
    "errorMessage": "入力情報を確認してください。",
    "signIn": "既存会員ですか。"
  },
  "cn": {
    "title": "注册会员",
    "name": "名气",
    "email": "电子邮件",
    "password": "密码",
    "submit": "注册会员",
    "errorMessage": "请确认输入信息。",
    "signIn": "是现有会员吗？"
  }
}
</i18n>
