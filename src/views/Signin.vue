<style lang="less" scoped>
  .signin-wrapper {
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

  .form-wrapper {
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
</style>

<template lang="pug">
  section.signin-wrapper
    .header
      .assemble-logo

    .form-wrapper
      h1.form-title 로그인하기
      form(@submit.prevent="submit")
        input.email(placeholder="이메일", type="email", v-model="form.email")
        input.password(placeholder="비밀번호", type="password", v-model="form.password")
        button.login(type="submit") 로그인
        p.error-message(v-if="error") 이메일 혹은 비밀번호를 확인해주세요
      router-link.join(to="/signup") 회원가입
</template>

<script>
export default {

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
      const accessToken = await this.$store.dispatch('login', {
        email: this.form.email,
        password: this.form.password,
      });
      this.$localStorage.set('token', `${accessToken}`);
      this.$http.defaults.headers.common.Authorization = `Bearer ${accessToken}`;

      await this.$store.dispatch('fetchMe');
      this.$router.push('/');
    },
  },

};
</script>
