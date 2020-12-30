<style lang="less" scoped>
  .signin-to-connecting-wrapper {
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
</style>

<template lang="pug">
  section.signin-to-connecting-wrapper
    .header
      .assemble-logo

    .form-wrapper
      h1.form-title 클럽패스와 연결하기
      form(@submit.prevent="submit")
        input.readonly(:value="appUserName",readonly)
        input.email(placeholder="이메일", type="email", v-model="email")
        input.password(placeholder="비밀번호", type="password", v-model="password")
        p.info 연결이 완료되면 두 서비스의 계정 공개 정보, 어셈블 포인트 이력과 합계를 두 서비스가 함께 공유합니다.
        button.login(type="submit") 로그인
        p.error-message(v-if="error") 이메일 혹은 비밀번호를 확인해주세요
      router-link.join(to="/signup") 회원가입
</template>

<script>
export default {
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
      const accessToken = await this.$store.dispatch('login', {
        email: this.email,
        password: this.password,
      });
      this.$localStorage.set('token', `${accessToken}`);
      this.$http.defaults.headers.common.Authorization = `Bearer ${accessToken}`;

      await this.$store.dispatch('fetchMe');

      this.$router.push({
        path: '/connecting',
        query: this.$route.query,
      });
    },
  },
};
</script>
