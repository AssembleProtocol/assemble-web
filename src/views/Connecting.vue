<style lang="less" scoped>
  .connecting-container {
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
  .another-button {
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
  @media only screen and (min-width: 768px) {
    .connecting-container {
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
    .title {
      margin-top: 0;
    }
  }
</style>

<template lang="pug">
  section.connecting-container
    .nav
      .assemble-logo

    .contents.assemble-section
      h1.title {{ $t('title', { appName }) }}
      .account-info
        .club-pass.text {{ appName }} #[strong {{ appUserName }}]
        .assemble.text {{ $t('assembleLabel') }} #[strong {{ me.name }}] #[strong {{ me.email }}]
        .account-link.text {{ $t('connectDescription') }}
        p.info.text {{ $t('description') }}
      button.account(@click="submit") {{ $t('submit') }}
      button.another-button(@click="goToSigninToConnecting") {{ $t('anotherAccount') }}
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
      name: '',
      email: '',
      redirect_uri: '',
      response_type: '',
      state: '',
    };
  },
  mounted() {
    this.appUserName = this.$route.query.appUserName;
    this.name = this.$route.query.name;
    this.email = this.$route.query.email;
    this.redirect_uri = this.$route.query.redirect_uri;
    this.response_type = this.$route.query.response_type;
    this.state = this.$route.query.state;
  },
  methods: {
    async submit() {
      try {
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
      } catch (e) {
        if (!e.response || !e.response.data) return;
        this.$toast(e.response.data.message);
      }
    },
    goToSigninToConnecting() {
      this.$router.push({ path: this.$localePath('/signin-to-connecting'), query: this.$route.query });
    },
  },
};
</script>

<i18n>
{
  "ko": {
    "title": "{appName} 연결하기",
    "assembleLabel": "어셈블",
    "connectDescription": "두 계정을 연결하고 있습니다.",
    "description": "연결이 완료되면 두 서비스의 계정 공개 정보, 어셈블 포인트 이력과 합계를 두 서비스가 함께 공유합니다.",
    "submit": "연결하기",
    "anotherAccount": "다른 계정으로 연결하기"
  },
  "en": {
    "title": "Connecting {appName}",
    "assembleLabel": "assemble",
    "connectDescription": "Connecting two accounts.",
    "description": "When the connection is complete, the two services share account disclosure information, assemble point history, and sum together.",
    "submit": "connecting",
    "anotherAccount": "connecting to a different account"
  },
  "ja": {
    "title": "{appName}接続します。",
    "assembleLabel": "assemble",
    "connectDescription": "二つのアカウントを繋いでいます。",
    "description": "接続が完了すると、両サービスのアカウント公開情報、アセンブルポイント履歴と合計を両サービスが共有します。",
    "submit": "つなぎ",
    "anotherAccount": "別勘定につなぐ"
  },
  "cn": {
    "title": "连接 {appName}",
    "assembleLabel": "assemble",
    "connectDescription": "正在连接两个账户。",
    "description": "连接完成后， 两个服务将共享两个服务的账户公开信息、 汇编积分履历和合计 。",
    "submit": "连接",
    "anotherAccount": "连接到其它账户"
  }
}
</i18n>
