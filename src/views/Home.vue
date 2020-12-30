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
      router-link.profile-button(to="/setting")
    article.article
      section.section
        .point-box
          nav.point-box-nav
            strong.point-box-title 보유 포인트
          point-text.point-box-text(:value="37131")
      section.section
        h1.section-title 연결된 앱
        .list-item-group
          router-link.list-item-wrapper(to="/exchange-center")
            list-item(title="ASM 교환소", subtitle="asm.assembleprotocol.io")
              point-text.partner-item-point(slot="suffix", :value="131", size="small")
          a.list-item-wrapper(
            v-for="myApp in myApps",
            :key="myApp._id",
            :href="myApp.url",
            target="_blank",
            @click="handleLink($event, '')",
          )
            list-item(:title="myApp.name", :subtitle="myApp.subtitle")
              point-text.partner-item-point(slot="suffix", :value="131", size="small")
      section.section
        h1.section-title 포인트 내역
        .list-item-group
          list-item(
            v-for="history in histories",
            :key="history._id",
            title="클럽패스",
            titleSuffix="1일전",
            subtitle="게시물 작성 (오늘 존잘2명이랑 넷플릭스 오늘 존잘2명이랑 넷플릭스 오늘 존잘2명이랑 넷플릭스",
            size="small",
          )
            point-text.partner-item-point(slot="suffix", type="plus", :value="131", size="small")
</template>

<script>
import PointText from '@/components/PointText';
import ListItem from '@/components/ListItem';

const MY_APP_URL_MAP = {
  clubpass: 'https://stage.club-pass.com/',
};

const MY_APP_SUBTITLE_MAP = {
  clubpass: 'club-pass.com',
};

const MY_APP_NAME_MAP = {
  clubpass: '클럽패스',
};

export default {
  components: {
    PointText,
    ListItem,
  },
  data() {
    return {
      histories: null,
      myApps: null,
    };
  },
  async mounted() {
    const [
      // { data: histories },
      { data: myApps },
    ] = await Promise.all([
      // this.$http.get('/users/me/point-histories'),
      this.$http.get('/my-apps'),
    ]);
    // this.histories = histories;
    this.myApps = myApps.slice(1).map((a) => ({
      ...a,
      url: MY_APP_URL_MAP[a.appId],
      name: MY_APP_NAME_MAP[a.appId],
      subtitle: MY_APP_SUBTITLE_MAP[a.appId],
    }));
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
