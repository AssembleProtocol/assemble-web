<style lang="less" scoped>
  .profile-container {
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
  .user-nickname {
    font-size: 14px;
    line-height: 2;
    color: rgba(72, 89, 109, .6);
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
  section.profile-container
    .nav
      button.back-button(@click="goBack")
      button.logout-button(@click="logout") {{ $t('logout') }}
    .contents.assemble-section
      section.section
        h2.section-title {{ $t('managingAccount') }}
        p.user-nickname {{ me.name }} ({{ me.email }})
        locale-router-link.link(to="/change-email") {{ $t('changingEmail') }}
        locale-router-link.link(to="/change-password") {{ $t('changingPassword') }}
      section.section
        h2.section-title {{ $t('assembleMarket') }}
        locale-router-link.link(to="/store/tickets") {{ $t('viewAllTickets') }}
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
</template>

<script>
import { mapState } from 'vuex';

export default {
  computed: {
    ...mapState({
      me: (state) => state.me,
    }),
  },
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
    "assembleMarket": "어셈블 마켓",
    "viewAllTickets": "구입한 티켓들 보기",
    "appInformation": "앱 정보",
    "terms": "이용약관",
    "privacy": "개인정보취급방침",
    "inquiry": "문의 보내기"
  },
  "en": {
    "logout": "logout",
    "managingAccount": "Managing accounts",
    "changingEmail": "Changing email",
    "changingPassword": "Changing password",
    "assembleMarket": "Assemble Market",
    "viewAllTickets": "View all tickets",
    "appInformation": "App information",
    "terms": "Terms",
    "privacy": "Privacy",
    "inquiry": "Inquiry"
  },
  "ja": {
    "logout": "ログアウト",
    "managingAccount": "勘定管理",
    "changingEmail": "email変更",
    "changingPassword": "暗証番号変更",
    "appInformation": "アプリ情報",
    "terms": "利用規約",
    "privacy": "個人情報の取り扱い方針",
    "inquiry": "照会"
  },
  "cn": {
    "logout": "注销",
    "managingAccount": "管理账户",
    "changingEmail": "更改 email",
    "changingPassword": "更改密码",
    "appInformation": "应用程序信息",
    "terms": "使用条款",
    "privacy": "个人信息管理方针",
    "inquiry": "讯问"
  }
}
</i18n>
