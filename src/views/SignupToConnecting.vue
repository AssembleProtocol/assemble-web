<style lang="less" scoped>
  .signup-to-connecting-wrapper {
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
</style>

<template lang="pug">
  section.signup-to-connecting-wrapper
    .header
      .assemble-logo

    .form-wrapper
      h1.form-title 회원가입 및 클럽패스와 연결하기
      form(@submit.prevent="submit")
        input(:value="id",readonly).readonly
        input(placeholder="이름" type="text", v-model="form.name").name
        input(placeholder="이메일", type="email", v-model="form.email").email
        input(placeholder="비밀번호", type="password", v-model="form.password").password
        p.info 연결이 완료되면 클럽패스와 어셈블 및 클럽패스의 계정 공개 정보, 어셈블 포인트 이력과 합계를 함께 공유합니다.
        button.join(type="submit") 회원가입
        p.error-message(v-if="error") 입력 정보들을 확인해주세요.
      router-link(to="/signin").member 기존 회원인가요?
</template>

<script>
export default {

  data() {
    return {
      id: 'NANANA',
      form: {
        name: null,
        email: null,
        password: null,
      },

      error: false,
    };
  },

  methods: {
    submit() {
      const nameValidity = !!this.form.name;
      const emailValidity = !!this.form.email;
      const passwordValidity = !!this.form.password;

      if (nameValidity && emailValidity && passwordValidity) {
        this.$router.push({
          path: '/email-authentication',
          query: {
            from: 'signup-to-connecting',
            id: this.id,
            name: this.form.name,
            email: this.form.email,
          },
        });
      } else {
        this.error = true;
      }
    },
  },
};
</script>