<style lang="less" scoped>
  .container {
    padding: 0 10px;
  }
  .header-wrapper {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 24px 20px;
  }

  .assemble-logo {
    width: 201.59px;
    height: 32px;
  }

  .icon-wrapper {
    display: flex;
  }

  .icon-button {
    width: 32px;
    height: 32px;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 12px;
    background-color: #F7F8FA;
  }

  .user-icon-button {
    margin-left: 20px;
  }

  .icon {
    width: 24px;
    height: 24px;
  }

  // ----------------------------------- //

  .my-asm-wrapper {
    margin: 10px 10px 0 10px;
    padding: 20px 25px 20px 20px;
    border-radius: 32px;
    background-color: #F7F8FA;
  }

  .title-and-wallet {
    display: flex;
    justify-content: space-between;
    font-weight: bold;
    font-size: 16px;
    line-height: 150%;
  }

  .my-asm {
    color: #48596D;
  }

  .wallet {
    font-weight: bold;
    font-size: 16px;
    line-height: 150%;
    color: #4886FD;
  }

  .my-balance {
    font-weight: bold;
    font-size: 20px;
    line-height: 150%;
    margin-top: 10px;
    color: #1F2E44;
  }

  // ------------------------------ //

  .partners-wrapper {
    padding: 0 0 0 20px;
  }

  .partners-wrapper-title {
    margin-top: 40px;
    font-weight: bold;
    font-size: 24px;
    line-height: 150%;
    color: #1F2E44;
  }

  .partners {
    padding-top: 20px;
  }

  .partners-inner-wrapper {
    display: flex;
  }

  .partners-logo {
    width: 75px;
    height: 75px;
  }

  .partners-info-wrapper {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-left: 10px;
    padding:10px 20px 23px 10px;
    width: 100%;
    border-bottom: 1px solid #F7F8FA;
  }

  .partners-info {
    font-size: 16px;
    line-height: 150%;
  }

  .partners-title {
    font-weight: bold;
    color: #1F2E44;
  }

  .pattners-domain {
    color: #48596D;
    opacity: 0.6;
  }

  .partners-point {
    display: flex;
  }

  .point-num {
    font-weight: bold;
    font-size: 18px;
    line-height: 150%;
  }

  .point-image {
    width: 16.03px;
    height: 21.41px;
  }

  .arrow-icon-button {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 24px;
    height: 24px;
    margin-left: 20.78px;
    border-radius: 10px;
    background-color: #F7F8FA;
  }

  .arrow-icon {
    width: 16px;
    height: 16px;
  }
</style>

<template lang="pug">
  section.container
    header.header-wrapper
      img.assemble-logo(src="@/assets/img/assemble-logo.png")
      .icon-wrapper
        button.user-icon-button.icon-button
          img.user-icon.icon(src="@/assets/img/user-icon.png")

    .my-asm-wrapper
      .title-and-wallet
        .my-asm MY ASM
        router-link(to="/wallet").wallet 지갑보기 〉
      .my-balance 3.535 ASM (14,363 KRW)

    chart(:data="data")
    .partners-wrapper
      .partners-wrapper-title Partners

      .partners
        .partners-inner-wrapper
          img.partners-logo(src="@/assets/img/partners-logo.png")
          .partners-info-wrapper
            .partners-info
              .partners-title 클럽패스
              .pattners-domain club-pass.com
            .partners-point
              .point-num 1,131
              img.point-image(src="@/assets/img/point-icon.png")
              button.arrow-icon-button
                img.arrow-icon(src="@/assets/img/arrow-icon.png")
</template>

<script>

import Chart from '@/components/Chart';

const DATA = [
  { min: 120, max: 140, start: 120, end: 135, date: '2020-12-09' },
  { min: 100, max: 135, start: 135, end: 125, date: '2020-12-10' },
  { min: 120, max: 140, start: 125, end: 140, date: '2020-12-11' },
  { min: 130, max: 160, start: 140, end: 150, date: '2020-12-12' },
  { min: 120, max: 170, start: 150, end: 110, date: '2020-12-13' },
  { min: 100, max: 130, start: 110, end: 115, date: '2020-12-14' },
  { min: 100, max: 130, start: 110, end: 115, date: '2020-12-15' },
  { min: 120, max: 140, start: 120, end: 135, date: '2020-12-16' },
  { min: 100, max: 135, start: 135, end: 125, date: '2020-12-17' },
  { min: 120, max: 140, start: 125, end: 140, date: '2020-12-18' },
  { min: 130, max: 160, start: 140, end: 150, date: '2020-12-19' },
  { min: 120, max: 170, start: 150, end: 110, date: '2020-12-20' },
  { min: 100, max: 130, start: 110, end: 115, date: '2020-12-21' },
  { min: 100, max: 130, start: 110, end: 115, date: '2020-12-22' },
];

export default {
  components: {
    Chart,
  },
  data() {
    return {
      data: DATA,
    };
  },
};
</script>
