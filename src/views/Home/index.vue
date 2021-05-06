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
  .list-empty-contents {
    margin-top: 10px;
  }
  .list-empty-paragraph {
    margin-bottom: 10px;
    color: rgba(72, 89, 109, .6);
  }
  .section-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  .link-button {
    font-size: 14px;
    font-weight: bold;
    line-height: 28px;
    color: #6096FF;
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
          point-text.point-box-text(:value="totalAsp")
      section.section
        h1.section-title 연결된 앱
        .list-item-group
          router-link.list-item-wrapper(to="/exchange-center")
            list-item(title="ASM 교환소", appId="exchange", subtitle="app.assembleprotocol.com")
          a.list-item-wrapper(
            v-for="myApp in myApps",
            :key="myApp._id",
            :href="myApp.url",
            target="_blank",
            @click="handleLink($event, myApp.url)",
          )
            list-item(:title="myApp.name", :appId="myApp.appId", :subtitle="myApp.subtitle")
      section.section
        .section-header
          h1.section-title 최근 포인트 내역
          router-link.link-button(to="/point-histories") 모두 보기
        .list-item-group(v-if="histories && (histories.length > 0)")
          small-list-item(
            v-for="history in histories",
            :key="history._id",
            :appId="history.appId",
            :title="history.appId === 'clubpass' ? '클럽패스' : 'ASM 교환소'",
            :titleSuffix="history.createdAt",
            :subtitle="history.message",
            size="small",
          )
            point-text.partner-item-point(slot="suffix", :type="history.amount > 0 ? 'plus' : 'minus'", :value="Math.abs(history.amount)", size="small")
        .list-empty-contents(v-else)
          p.list-empty-paragraph 현재 포인트 내역이 없습니다.
          small-loading-list-item
          small-loading-list-item
          small-loading-list-item
      store-section
</template>

<script>
import PointText from '@/components/PointText';
import ListItem from '@/components/ListItem';
import SmallListItem from '@/components/SmallListItem';
import SmallLoadingListItem from '@/components/SmallLoadingListItem';
import StoreSection from './components/StoreSection';

const MY_APP_URL_MAP = {
  clubpass: 'https://stage.club-pass.com/ko/me',
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
    SmallListItem,
    SmallLoadingListItem,
    StoreSection,
  },
  data() {
    return {
      histories: null,
      myApps: null,
      totalAsp: 0,
    };
  },
  async mounted() {
    const [
      { data: pointsData },
      { data: histories },
      { data: myApps },
    ] = await Promise.all([
      this.$http.get('/users/me/points'),
      this.$http.get('/users/me/point-histories'),
      this.$http.get('/my-apps'),
    ]);
    const { points } = pointsData;
    this.totalAsp = points;
    this.histories = histories.slice(0, 5);
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