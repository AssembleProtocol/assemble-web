<style lang="less" scoped>
  .signup-to-connecting-container {
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
      border:1px solid #1D6AFE;;
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
    .signup-to-connecting-container {
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
  section.signup-to-connecting-container
    .nav
      .assemble-logo

    .contents.assemble-section
      h1.form-title {{ $t('title', { appName }) }}
      form(@submit.prevent="submit")
        input(:value="appUserName",readonly).readonly
        input(:placeholder="$t('name')" type="text", v-model="name").name
        input(:placeholder="$t('email')", type="email", v-model="email").email
        input(:placeholder="$t('password')", type="password", v-model="password").password
        p.info {{ $t('description', { appName }) }}
        button.join(type="submit") {{ $t('submit') }}
        p.error-message(v-if="error") {{ $t('errorMessage') }}
      button(@click="goToSignIn").member {{ $t('signIn') }}
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
      appUserName: '',
      name: null,
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
      const nameValidity = !!this.name;
      const emailValidity = !!this.email;
      const passwordValidity = !!this.password;

      if (!nameValidity || !emailValidity || !passwordValidity) {
        this.error = true;
        return;
      }

      try {
        await this.$http.post('/users', {
          name: this.name,
          email: this.email,
          password: this.password,
        });
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
            query: { ...this.$route.query, email: this.me.email, from: 'signup-to-connecting' },
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
    goToSignIn() {
      this.$router.push({ path: this.$localePath('/signin-to-connecting'), query: this.$route.query });
    },
  },
};
</script>

<i18n>
{
  "ko": {
    "title": "회원가입 및 {appName} 연결하기",
    "name": "이름",
    "email": "이메일",
    "password": "비밀번호",
    "description": "연결이 완료되면 어셈블과 {appName}의 계정 공개 정보, 어셈블 포인트 이력과 합계를 함께 공유합니다.",
    "submit": "회원가입",
    "errorMessage": "입력 정보들을 확인해주세요.",
    "signIn": "기존 회원인가요?"
  },
  "en": {
    "title": "Sign up for membership and connecting {appName}",
    "name": "name",
    "email": "email",
    "password": "password",
    "description": "Once the connection is complete, share the account disclosure information, assemble point history and totals of Assemble and {appName}.",
    "submit": "sign up",
    "errorMessage": "Please check the input information.",
    "signIn": "Are you an existing member?"
  },
  "ja": {
    "title": "会員登録および{appName}を接続します。",
    "name": "お名前",
    "email": "パスワード",
    "password": "パスワード",
    "description": "接続が完了すると、Assembleと{appName}のアカウント公開情報、アセンブルポイント履歴と合計を共有します。",
    "submit": "会員加入",
    "errorMessage": "入力情報を確認してください。",
    "signIn": "既存会員ですか。"
  },
  "cn": {
    "title": "注册会员及连接{appName}",
    "name": "名气",
    "email": "电子邮件",
    "password": "密码",
    "description": "连接完成后， 共享Assemble 和{appName} 的账户公开信息、 汇编积分履历和合计。",
    "submit": "注册会员",
    "errorMessage": "请确认输入信息。",
    "signIn": "是现有会员吗？"
  }
}
</i18n>
