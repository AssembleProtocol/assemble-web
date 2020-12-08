<style lang="less" scoped>
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
    margin: 20px 10px 0 10px;
    padding: 20px;
    border-radius: 16px;
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
    padding: 0 10px;
  }

  .partners-wrapper-title {
    margin-top: 23px;
    font-weight: bold;
    font-size: 24px;
    line-height: 150%;
    color: #1F2E44;
  }

  .partners {
    padding: 10px 0;
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
  section.main
    header.header-wrapper
      img.assemble-logo(src="@/assets/img/assemble-logo.png")
      .icon-wrapper
        .user-icon-button.icon-button
          img.user-icon.icon(src="@/assets/img/user-icon.png")

    .my-asm-wrapper
      .title-and-wallet
        .my-asm MY ASM
        .wallet 지갑보기 〉
      .my-balance 3.535 ASM (14,363 KRW)

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
              .arrow-icon-button
                img.arrow-icon(src="@/assets/img/arrow-icon.png")
</template>

<script>
export default {

};
</script>
