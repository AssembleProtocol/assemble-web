<style lang="less" scoped>
  .setting-wrapper {
    padding: 0 20px;
  }

  .header {
    display: flex;
    align-items: center;
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

  .link-wrapper {
    margin-top: 20px;
    margin-bottom: 92px;
  }

  .title {
    font-weight: bold;
    font-size: 24px;
    line-height: 160%;
    color: #1F2E44;
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
</style>

<template lang="pug">
  section.setting-wrapper
    .header
      button.back-button(@click="goBack")
    .link-wrapper
      //- h2.account-management.title 계정 관리하기
        router-link(to="#").change-email.link 이메일 주소 변경하기
        router-link(to="#").change-password.link 비밀번호 변경하기
      h2.app-info.title 앱 정보
        router-link(to="#").terms.link 이용약관
        router-link(to="#").privacy-statement.link 개인정보취급방침
        router-link(to="#").send-inquiry.link 문의 보내기
      h2.assemble-protocol.title 어셈블 프로토콜
        a.offical-site.link(
          href="http://assembleprotocol.io/",
          target="_blank",
          @click="handleLink($event, 'http://assembleprotocol.io/')"
        )
          img(src="@/assets/site-icon.png")
          .link-text 공식 사이트
        a.twitter.link(
          href="https://twitter.com/ASSEMBLE_io",
          target="_blank",
          @click="handleLink($event, 'https://twitter.com/ASSEMBLE_io')"
        )
          img(src="@/assets/twitter-icon.png")
          .link-text 트위터
        a.telegram-news.link(
          href="https://t.me/assembleprotocol",
          target="_blank",
          @click="handleLink($event, 'https://t.me/assembleprotocol')"
        )
          img(src="@/assets/telegram-icon.png")
          .link-text 텔레그램 뉴스
        a.kakao-talk.link(
          href="https://open.kakao.com/o/goYU7n8b",
          target="_blank",
          @click="handleLink($event, 'https://open.kakao.com/o/goYU7n8b')"
        )
          img(src="@/assets/kakaotalk-icon.png")
          .link-text 카카오톡 커뮤니티
</template>

<script>
export default {
  methods: {
    goBack() {
      this.$router.back();
    },
    handleLink(e, url) {
      e.preventDefault();
      if (window.s3app) window.s3app.openInAppBrowser(url);
      else window.open(url);
    },
  },
};
</script>
