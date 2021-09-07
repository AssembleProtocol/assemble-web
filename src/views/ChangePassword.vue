<style lang="less" scoped>
  .change-password-container {
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
  .login-button {
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

    &.inactive {
      background-color: #808080;
    }
  }
  @media only screen and (min-width: 768px) {
    .change-password-container {
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
  section.change-password-container
    header.nav
      button.back-button(@click="goBack")
    .contents.assemble-section
      h1.form-title {{ $t('title') }}
      form(@submit.prevent="submit")
        input.password(:placeholder="$t('previousPassword')", type="password", v-model="oldPassword")
        input.password(:placeholder="$t('newPassword')", type="password", v-model="newPassword")
        button.login-button(:class="{ inactive: !validity }", type="submit") {{ $t('submit') }}
</template>

<script>
export default {
  computed: {
    validity() {
      if (!this.oldPassword || !this.newPassword) return false;
      return true;
    },
  },
  data() {
    return {
      oldPassword: null,
      newPassword: null,
    };
  },
  methods: {
    goBack() {
      this.$router.back();
    },
    async submit() {
      if (!this.validity) return;

      try {
        await this.$http.put('/users/me/password', {
          oldPassword: this.oldPassword,
          newPassword: this.newPassword,
        });
        this.$toast('비밀번호가 변경되었습니다.');
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
    "title": "비밀번호 변경하기",
    "previousPassword": "기존 비밀번호",
    "newPassword": "새 비밀번호",
    "submit": "변경하기"
  },
  "en": {
    "title": "Change password",
    "previousPassword": "previous password",
    "newPassword": "new password",
    "submit": "Change"
  },
  "ja": {
    "title": "暗証番号変更",
    "previousPassword": "既存パスワード",
    "newPassword": "新しい暗証番号",
    "submit": "変更する"
  },
  "cn": {
    "title": "更改密码",
    "previousPassword": "现有密码",
    "newPassword": "新建密码",
    "submit": "更改"
  }
}
</i18n>
