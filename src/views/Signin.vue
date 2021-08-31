<style lang="less" scoped>
  .signin-container {
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
  .link-button {
    margin-top: 20px;
    font-weight: bold;
    font-size: 14px;
    line-height: 200%;
    color: #1D6AFE;
  }
  @media only screen and (min-width: 768px) {
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
  section.signin-container
    .nav
      .assemble-logo

    .contents.assemble-section
      h1.form-title 로그인하기
      form(@submit.prevent="submit")
        input.email(placeholder="이메일", type="email", v-model="form.email")
        input.password(placeholder="비밀번호", type="password", v-model="form.password")
        button.login(type="submit") 로그인
        p.error-message(v-if="error") 이메일 혹은 비밀번호를 확인해주세요
      locale-router-link.link-button(to="/request-reset-password") 비밀번호를 잊으셨나요?
      locale-router-link.link-button(to="/signup") 회원이 아니신가요?
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
        email: null,
        password: null,
      },
      error: false,
    };
  },
  methods: {
    async submit() {
      const emailValid = !!this.form.email;
      const passwordValid = !!this.form.password;

      if (!emailValid || !passwordValid) {
        this.error = true;
        return;
      }
      try {
        const accessToken = await this.$store.dispatch('login', {
          email: this.form.email,
          password: this.form.password,
        });
        this.$localStorage.set('token', `${accessToken}`);
        this.$http.defaults.headers.common.Authorization = `Bearer ${accessToken}`;

        await this.$store.dispatch('fetchMe');
        if (!this.me.emailVerified) {
          this.$router.push({
            path: '/email-verification',
            query: { email: this.me.email },
          });
          return;
        }
        this.$router.push('/');
      } catch (e) {
        if (!e.response || !e.response.data) {
          this.$toast('이메일 또는 비밀번호를 확인해주세요.');
          return;
        }
        this.$toast(e.response.data.message);
      }
    },
  },

};
</script>
