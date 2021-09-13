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

    &.active {
      color: #707C8D;
    }
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
    .contents.assemble-section
      section.section
        h2.section-title {{ $t('languageTitle') }}
        //- button.link(:class="{ active: $i18n.locale === 'en' }", @click="changeLocale('en')") English
        button.link(:class="{ active: $i18n.locale === 'ko' }", @click="changeLocale('ko')") 한국어
      section.section
        h2.section-title {{ $t('asmProtocol') }}
        a.link(
          href="https://assembleprotocol.io",
          target="_blank",
          @click="handleLink($event, 'https://assembleprotocol.io')"
        )
          img(src="@/assets/compas.svg")
          .link-text {{ $t('assembleprotocol') }}
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
    changeLocale(locale) {
      this.$root.$i18n.locale = locale;
      this.$router.replace(this.$localePath('/', locale));
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
    "languageTitle": "언어",
    "asmProtocol": "어셈블 프로토콜",
    "assembleprotocol": "어셈블 프로토콜",
    "twitter": "트위터",
    "telegram": "텔레그램 뉴스",
    "kakaotalk": "카카오톡 커뮤니티"
  },
  "en": {
    "languageTitle": "Language",
    "asmProtocol": "Assemble Protocol",
    "assembleprotocol": "Assembleprotocol.io",
    "twitter": "Twitter",
    "telegram": "Telegram news",
    "kakaotalk": "Kakaotalk community"
  },
  "ja": {
    "languageTitle": "言語",
    "asmProtocol": "Assemble Protocol",
    "twitter": "Twitter",
    "telegram": "Telegram news",
    "kakaotalk": "Kakaotalk community"
  },
  "cn": {
    "languageTitle": "语言",
    "asmProtocol": "Assemble Protocol",
    "twitter": "Twitter",
    "telegram": "Telegram news",
    "kakaotalk": "Kakaotalk community"
  }
}
</i18n>
