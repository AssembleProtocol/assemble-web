<style lang="less" scoped>
  .nav {
    position: sticky;
    top: 0;
    display: flex;
    align-items: center;
    width: 100%;
    height: 80px;
    padding: 0 20px;
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
    position: relative;
    margin-top: 10px;
    padding-right: 37px;
    font-size: 46px;
    font-weight: bold;
    line-height: 69px;
    &::after {
      content: "";
      display: block;
      position: absolute;
      width: 37px;
      height: 69px;
      background-image: url(~@/assets/asp-icon-large.svg);
      background-size: cover;
      background-repeat: no-repeat;
    }
  }
  .section-title {
    font-size: 24px;
    line-height: 36px;
  }
  .partner-item {
    display: flex;
    align-items: center;
  }
  .partner-item-thumbnail {
    width: 75px;
    height: 75px;
    border-radius: 50%;
  }
  .partner-item-contents {
    flex: 1;
  }
  .partner-item-title {
    font-size: 16px;
  }
  .partner-item-subtitle {
    color: #48596D;
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
          p.point-box-text 37,131
      section.section
        h1.section-title 연결된 앱
        .partner-item
          .partner-item-thumbnail
          .partner-item-contents
            h2.partner-item-title 클럽패스
            p.partner-item-subtitle club-pass.com
          p.partner-item-point 131
      section.section
        h1.section-title 포인트 내역
        .history-item
          .history-item-thumbnail
          .history-item-contents
            h2.history-item-title 클럽패스 #[span.history-item-created 1일전]
            p.history-item-description 게시물 작성 (오늘 존잘2명이랑 넷플릭
          p.history-item-point +10
</template>

<script>
export default {
};
</script>
