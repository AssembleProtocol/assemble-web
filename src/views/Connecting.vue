<style lang="less" scoped>
  .account-link-wrapper {
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

  .content {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .title {
    margin-top: 40px;
    max-width: 500px;
    width: 100%;
    font-weight: bold;
    font-size: 24px;
    line-height: 160%;
    color: #1F2E44;
  }

  .account-info {
    margin-top: 10px;
  }

  .text {
    font-size: 14px;
    line-height: 200%;
    opacity: 0.6;
    color: #48596D;
  }

  .info {
    max-width: 500px;
    width: 100%;
  }

  .account {
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

  .another {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 20px;
    width: 100%;
    font-weight: bold;
    font-size: 14px;
    line-height: 200%;
    color: #1D6AFE;
  }
</style>

<template lang="pug">
  section.account-link-wrapper
    .header
      .assemble-logo

    .content
      h1.title 클럽패스와 연결하기
      .account-info
        .club-pass.text 클럽패스 #[strong {{ appUserName }}]
        .assemble.text 어셈블 #[strong {{ me.name }}] #[strong {{ me.email }}]
        .account-link.text 두 계정을 연결하고 있습니다.
        p.info.text 연결이 완료되면 두 서비스의 계정 공개 정보, 어셈블 포인트 이력과 합계를 두 서비스가 함께 공유합니다.
      button.account(@click="submit") 연결하기
      router-link(to="/signin-to-connecting").another 다른 계정으로 연결하기
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
      appUserName: '',
      name: '',
      email: '',
      client_id: '',
      redirect_uri: '',
      response_type: '',
      state: '',
    };
  },
  mounted() {
    this.appUserName = this.$route.query.appUserName;
    this.name = this.$route.query.name;
    this.email = this.$route.query.email;
    this.client_id = this.$route.query.client_id;
    this.redirect_uri = this.$route.query.redirect_uri;
    this.response_type = this.$route.query.response_type;
    this.state = this.$route.query.state;
  },
  methods: {
    async submit() {
      const { data } = await this.$http.post('/oauth2/auth-codes', {
        client_id: this.client_id,
        redirect_uri: decodeURIComponent(this.redirect_uri),
        response_type: this.response_type,
      });
      const { code } = data;
      // TODO: redirect_uri에 query 고려해서 붙여야함
      let url = `${decodeURIComponent(this.redirect_uri)}?code=${code}&client_id=${this.client_id}`;
      if (this.state) url = `${url}&state=${this.state}`;
      window.location.href = url;
    },
  },
};
</script>
