<style lang="less" scoped>
  .setting-container {
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
  .logout-button {
    font-size: 14px;
    font-weight: bold;
  }
  .contents {
    margin: 20px 0;
  }
  .section {
    margin-bottom: 60px;
  }
  .section-title {
    font-weight: bold;
    font-size: 24px;
    line-height: 38px;
  }
  .link {
    display: flex;
    align-items: center;
    font-weight: bold;
    font-size: 18px;
    line-height: 200%;
    color: #1D6AFE;
    margin-top: 20px;

    & img {
      width: 24px;
      height: 24px;
    }
  }
  .link-text {
    display: block;
    margin-left: 10px;
    font-weight: bold;
    font-size: 18px;
    line-height: 200%;
    color: #1D6AFE;
  }
  .assemble-protocol {
    margin-top: 60px;
  }
  @media only screen and (min-width: 768px) {
    .setting-container {
      padding: 0;
    }
    .nav {
      position: inherit;
      height: 120px;
      padding: 0 80px;
      background-color: transparent;
    }
    .back-button {
      top: 48px;
    }
    .contents {
      margin: 0 auto;
      padding: 20px;
    }
  }
</style>

<template lang="pug">
  section.setting-container
    .nav
      button.back-button(@click="goBack")
      button.logout-button(@click="logout") {{ $t('logout') }}
    .contents.assemble-section
      section.section
        h2.section-title {{ $t('managingAccount') }}
        locale-router-link(to="/change-email").link {{ $t('changingEmail') }}
        locale-router-link(to="/change-password").link {{ $t('changingPassword') }}
      section.section
        h2.section-title {{ $t('appInformation') }}
        a.link(
          href="https://docs.google.com/document/d/1ErojjhHKf5Hti9awyEwqj29recHJFE1X_coeHhfZXEw/edit?usp=sharing",
          target="_blank",
          @click="handleLink($event, 'https://docs.google.com/document/d/1ErojjhHKf5Hti9awyEwqj29recHJFE1X_coeHhfZXEw/edit?usp=sharing')"
        ) {{ $t('terms') }}
        a.link(
          href="https://docs.google.com/document/d/134_NoNW3qLNNn4JSzPAd70E7UteU68VFFyIlFikGs8A/edit?usp=sharing",
          target="_blank",
          @click="handleLink($event, 'https://docs.google.com/document/d/134_NoNW3qLNNn4JSzPAd70E7UteU68VFFyIlFikGs8A/edit?usp=sharing')"
        ) {{ $t('privacy') }}
        a.link(
          href="https://docs.google.com/forms/d/1goeZlSzYg7EHEK-hj1lu1YdtKt1XOQJ0oA_9NdXjQsU/edit?usp=sharing",
          target="_blank",
          @click="handleLink($event, 'https://docs.google.com/forms/d/1goeZlSzYg7EHEK-hj1lu1YdtKt1XOQJ0oA_9NdXjQsU/edit?usp=sharing')"
        ) {{ $t('inquiry') }}
      section.section
        h2.section-title {{ $t('asmProtocol') }}
        a.link(
          href="https://twitter.com/ASSEMBLE_io",
          target="_blank",
          @click="handleLink($event, 'https://twitter.com/ASSEMBLE_io')"
        )
          img(src="@/assets/twitter-icon.png")
          .link-text {{ $t('twitter') }}
        a.link(
          href="https://t.me/assembleprotocol",
          target="_blank",
          @click="handleLink($event, 'https://t.me/assembleprotocol')"
        )
          img(src="@/assets/telegram-icon.png")
          .link-text {{ $t('telegram') }}
        a.link(
          href="https://open.kakao.com/o/goYU7n8b",
          target="_blank",
          @click="handleLink($event, 'https://open.kakao.com/o/goYU7n8b')"
        )
          img(src="@/assets/kakaotalk-icon.png")
          .link-text {{ $t('kakaotalk') }}
</template>

<script>
export default {
  methods: {
    goBack() {
      this.$router.back();
    },
    logout() {
      this.$localStorage.remove('token');
      this.$store.commit('SET_ME', null);
      this.$router.push(this.$localePath('/signin'));
    },
    handleLink(e, url) {
      e.preventDefault();
      if (window.s3app) window.s3app.openInAppBrowser(url);
      else window.open(url);
    },
  },
};
</script>

<i18n>
{
  "ko": {
    "logout": "로그아웃",
    "managingAccount": "계정 관리하기",
    "changingEmail": "이메일 주소 변경하기",
    "changingPassword": "비밀번호 변경하기",
    "appInformation": "앱 정보",
    "terms": "이용약관",
    "privacy": "개인정보취급방침",
    "inquiry": "문의 보내기",
    "asmProtocol": "어셈블 프로토콜",
    "twitter": "트위터",
    "telegram": "텔레그램 뉴스",
    "kakaotalk": "카카오톡 커뮤니티"
  },
  "en": {
    "logout": "logout",
    "managingAccount": "Managing accounts",
    "changingEmail": "Changing email",
    "changingPassword": "Changing password",
    "appInformation": "App information",
    "terms": "Terms",
    "privacy": "Privacy",
    "inquiry": "Inquiry",
    "asmProtocol": "Assemble Protocol",
    "twitter": "Twitter",
    "telegram": "Telegram news",
    "kakaotalk": "Kakaotalk community"
  },
  "ja": {
    "logout": "ログアウト",
    "managingAccount": "勘定管理",
    "changingEmail": "email変更",
    "changingPassword": "暗証番号変更",
    "appInformation": "アプリ情報",
    "terms": "利用規約",
    "privacy": "個人情報の取り扱い方針",
    "inquiry": "照会",
    "asmProtocol": "Assemble Protocol",
    "twitter": "Twitter",
    "telegram": "Telegram news",
    "kakaotalk": "Kakaotalk community"
  },
  "cn": {
    "logout": "注销",
    "managingAccount": "管理账户",
    "changingEmail": "更改 email",
    "changingPassword": "更改密码",
    "appInformation": "应用程序信息",
    "terms": "使用条款",
    "privacy": "个人信息管理方针",
    "inquiry": "讯问",
    "asmProtocol": "Assemble Protocol",
    "twitter": "Twitter",
    "telegram": "Telegram news",
    "kakaotalk": "Kakaotalk community"
  }
}
</i18n>
