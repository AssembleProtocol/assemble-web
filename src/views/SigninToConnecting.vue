<style lang="less" scoped>
  .signin-to-connecting-container {
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

  .readonly {
    font-weight: bold;
    color: #707C8D;
    background-color: #E7E9EF;

    &:focus {
      border: 1px solid #F7F8FA;
    }
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

  .login {
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
    color: #FF134C;
  }

  .join {
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
    .signin-to-connecting-container {
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
  section.signin-to-connecting-container
    .nav
      .assemble-logo

    .contents.assemble-section
      h1.form-title {{ $t('title', { appName }) }}
      form(@submit.prevent="submit")
        input.readonly(:value="appUserName",readonly)
        input.email(:placeholder="$t('email')", type="email", v-model="email")
        input.password(:placeholder="$t('password')", type="password", v-model="password")
        p.info {{ $t('description') }}
        button.login(type="submit") {{ $t('submit') }}
        p.error-message(v-if="error") {{ $t('errorMessage') }}
      button.join(@click="goToSignupToConnecting") {{ $t('signUp') }}
</template>

<script>
import { mapState } from 'vuex';

const APP_NAME_MAP = {
  clubpass: {
    ko: '클럽패스',
    en: 'Clubpass',
    ja: 'Clubpass',
    cn: 'Clubpass',
  },
  sta1: {
    ko: '스타일닷컴',
    en: 'sta1.com',
    ja: 'sta1.com',
    cn: 'sta1.com',
  },
};

export default {
  computed: {
    ...mapState({
      me: (state) => state.me,
      client_id: (state) => state.route.query.client_id,
      locale: (state) => state.route.params.locale,
    }),
    appName() {
      const name = APP_NAME_MAP[this.client_id][this.locale];
      if (!name) return '';
      return name;
    },
  },
  data() {
    return {
      appUserName: null,
      email: null,
      password: null,
      error: false,
    };
  },
  mounted() {
    this.appUserName = this.$route.query.appUserName;
  },
  methods: {
    async submit() {
      const emailValid = !!this.email;
      const passwordValid = !!this.password;

      if (!emailValid || !passwordValid) {
        this.error = true;
        return;
      }
      try {
        const accessToken = await this.$store.dispatch('login', {
          email: this.email,
          password: this.password,
        });
        this.$localStorage.set('token', `${accessToken}`);
        this.$http.defaults.headers.common.Authorization = `Bearer ${accessToken}`;

        await this.$store.dispatch('fetchMe');
        if (!this.me.emailVerified) {
          this.$router.push({
            path: this.$localePath('/email-verification'),
            query: { email: this.me.email, from: 'signin-to-connecting' },
          });
          return;
        }

        this.$router.push({
          path: this.$localePath('/connecting'),
          query: this.$route.query,
        });
      } catch (e) {
        if (!e.response || !e.response.data) return;
        this.$toast(e.response.data.message);
      }
    },
    goToSignupToConnecting() {
      this.$router.push({ path: this.$localePath('/signup-to-connecting'), query: this.$route.query });
    },
  },
};
</script>

<i18n>
{
  "ko": {
    "title": "{appName} 연결하기",
    "email": "이메일",
    "password": "비밀번호",
    "description": "연결이 완료되면 두 서비스의 계정 공개 정보, 어셈블 포인트 이력과 합계를 두 서비스가 함께 공유합니다.",
    "submit": "로그인",
    "errorMessage": "이메일 혹은 비밀번호를 확인해주세요",
    "signUp": "회원가입"
  },
  "en": {
    "title": "Connecting {appName}",
    "email": "email",
    "password": "password",
    "description": "When the connection is complete, the two services share account disclosure information, assemble point history, and sum together.",
    "submit": "Login",
    "errorMessage": "이메일 혹은 비밀번호를 확인해주세요",
    "signUp": "Sign up"
  },
  "ja": {
    "title": "{appName}接続します。",
    "email": "パスワード",
    "password": "パスワード",
    "description": "接続が完了すると、両サービスのアカウント公開情報、アセンブルポイント履歴と合計を両サービスが共有します。",
    "submit": "Login",
    "errorMessage": "이메일 혹은 비밀번호를 확인해주세요",
    "signUp": "会員加入です"
  },
  "cn": {
    "title": "连接 {appName}",
    "email": "电子邮件",
    "password": "密码",
    "description": "连接完成后， 两个服务将共享两个服务的账户公开信息、 汇编积分履历和合计 。",
    "submit": "Login",
    "errorMessage": "이메일 혹은 비밀번호를 확인해주세요",
    "signUp": "注册会员"
  }
}
</i18n>
