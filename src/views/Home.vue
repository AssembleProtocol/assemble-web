<style lang="less" scoped>
  .nav {
    position: sticky;
    top: 0;
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    height: 80px;
    padding: 0 20px;
    background-color: #fff;
    z-index: 999;
  }
  .profile-button {
    width: 32px;
    height: 32px;
    border-radius: 50%;
    background-color: #F7F8FA;
    background-image: url(~@/assets/user-icon.png);
    background-size: 24px;
    background-position: center;
    background-repeat: no-repeat;
  }
  .section {
    padding: 20px;
  }
  .point-box {
    height: 145px;
    border-radius: 46px;
    padding: 20px 28px;
    background-color: #F7F8FA;
  }
  .point-box-text {
    margin-top: 10px;
  }
  .section-title {
    font-size: 24px;
    line-height: 36px;
  }
  .list-item-group {
    margin-top: 20px;
  }
</style>

<template lang="pug">
  section.home-container
    nav.nav
      img.logo(src="@/assets/assemble-logo.png", height="32")
      router-link.profile-button(to="/profile")
    article.article
      section.section
        .point-box
          nav.point-box-nav
            strong.point-box-title 보유 포인트
          point-text.point-box-text(:value="37131")
      section.section
        h1.section-title 연결된 앱
        .list-item-group
          a.list-item-wrapper(href="", target="_blank", @click="handleLink($event, '')")
            list-item(title="클럽패스", subtitle="club-pass.com")
              point-text.partner-item-point(slot="suffix", :value="131", size="small")
          a.list-item-wrapper(href="/exchange-center", target="_blank", @click="handleLink($event, '/exchange-center')")
            list-item(title="ASM 교환소", subtitle="asm.assembleprotocol.io")
              point-text.partner-item-point(slot="suffix", :value="131", size="small")
      section.section
        h1.section-title 포인트 내역
        .list-item-group
          list-item(
            title="클럽패스",
            titleSuffix="1일전",
            subtitle="게시물 작성 (오늘 존잘2명이랑 넷플릭스 오늘 존잘2명이랑 넷플릭스 오늘 존잘2명이랑 넷플릭스",
            size="small",
          )
            point-text.partner-item-point(slot="suffix", type="plus", :value="131", size="small")
          list-item(
            title="베니토",
            titleSuffix="1일전",
            subtitle="[후기 작성] 메즐리 배색 가디건 [후기 작성] 메즐리 배색 가디건 [후기 작성] 메즐리 배색 가디건",
            size="small",
          )
            point-text.partner-item-point(slot="suffix", type="plus", :value="200", size="small")
          list-item(
            title="클럽패스",
            titleSuffix="1일전",
            subtitle="패스 구입 사용",
            size="small",
          )
            point-text.partner-item-point(slot="suffix", type="minus", :value="1260", size="small")
</template>

<script>
import PointText from '@/components/PointText';
import ListItem from '@/components/ListItem';

export default {
  components: {
    PointText,
    ListItem,
  },
  methods: {
    handleLink(e, url) {
      e.preventDefault();
      if (window.s3app) window.s3app.openInAppBrowser(url);
      else window.open(url);
    },
  },
};
</script>
