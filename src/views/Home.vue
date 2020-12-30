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
          point-text.point-box-text(:value="totalAsp")
      section.section
        h1.section-title 연결된 앱
        .list-item-group
          router-link.list-item-wrapper(to="/exchange-center")
            list-item(title="ASM 교환소", appId="exchange", subtitle="asm.assembleprotocol.io")
              point-text.partner-item-point(slot="suffix", :value="totalExchangeAsp", size="small")
          a.list-item-wrapper(
            v-for="myApp in myApps",
            :key="myApp._id",
            :href="myApp.url",
            target="_blank",
            @click="handleLink($event, myApp.url)",
          )
            list-item(:title="myApp.name", :appId="myApp.appId", :subtitle="myApp.subtitle")
              point-text.partner-item-point(slot="suffix", :value="totalClubPassAsp", size="small")
      section.section
        h1.section-title 포인트 내역
        .list-item-group
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
</template>

<script>
import PointText from '@/components/PointText';
import ListItem from '@/components/ListItem';
import SmallListItem from '@/components/SmallListItem';

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
  },
  computed: {
    totalAsp() {
      return this.totalExchangeAsp + this.totalClubPassAsp;
    },
  },
  data() {
    return {
      histories: null,
      myApps: null,
      totalExchangeAsp: 0,
      totalClubPassAsp: 0,
    };
  },
  async mounted() {
    const [
      { data: histories },
      { data: myApps },
    ] = await Promise.all([
      this.$http.get('/users/me/point-histories'),
      this.$http.get('/my-apps'),
    ]);
    this.histories = histories;
    this.histories.filter((h) => h.appId === 'exchange').forEach((h) => { this.totalExchangeAsp += h.amount; });
    this.histories.filter((h) => h.appId === 'clubpass').forEach((h) => { this.totalClubPassAsp += h.amount; });
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
