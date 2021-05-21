<style lang="less" scoped>
  .reset-password-container {
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
  form {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
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
</style>

<template lang="pug">
  section.reset-password-container
    header.header
      .assemble-logo

    .contents
      h1.title 비밀번호 재설정하기
      form(@submit.prevent="submit")
        input.input(placeholder="이메일", type="email", :value="email", disabled)
        input.input(placeholder="비밀번호", type="password", v-model="password")
        button.submit-button(type="submit") 재설정 완료하기
</template>

<script>
import { mapState } from 'vuex';

export default {
  computed: {
    ...mapState({
      token: (state) => state.route.query.token,
      email: (state) => state.route.query.email,
    }),
  },
  data() {
    return {
      password: null,
    };
  },
  methods: {
    async submit() {
      try {
        await this.$http.put(`/users/${this.token}/password`, { newPassword: this.password });
        this.$toast('비밀번호를 재설정 했습니다');
        this.$router.push('/signin');
      } catch (e) {
        this.$router.push('/signin');
        if (!e.response || !e.response.data) return;
        this.$toast(e.response.data.message);
      }
    },
  },

};
</script>
