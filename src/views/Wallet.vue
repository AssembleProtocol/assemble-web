<style lang="less" scoped>
  .header-wrapper {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 13px 20px;
  }

  .page-title {
    font-weight: bold;
    font-size: 36px;
    line-height: 150%;
    color: #1F2E44;
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

  .icon {
    width: 24px;
    height: 24px;
  }

  // ------------------------------------------ //

  .my-asm-wrapper {
    margin: 10px 10px 0 10px;
    padding: 20px;
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

  .withdraw {
    height: 28px;
    padding: 2px 15px;
    border-radius: 8px;
    color: #ffffff;
    background-color: #1D6AFE;
  }

  .my-balance {
    font-weight: bold;
    font-size: 20px;
    line-height: 150%;
    margin-top: 10px;
    color: #1F2E44;
  }

  // ----------------------------------- //

  .QRcode-wrapper {
    margin: 10px 10px 0 10px;
    padding: 20px 20px 30px 20px;
    border-radius: 32px;
    background-color: #F7F8FA;
  }

  .group-title {
    display: flex;
    justify-content: space-between;
    font-weight: bold;
    font-size: 16px;
    line-height: 150%;
  }

  .deposit {
    color: #48596D;
  }

  .copy-link {
    color: #1D6AFE;
    font-weight: bold;
  }

  .group-center {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 20px;
  }

  .QRcode {
    width: 200px;
    height: 200px;
  }

  .QRcode-text {
    margin-top: 20px;
    font-weight: bold;
    font-size: 14px;
    line-height: 150%;
    text-align: center;
    color: #919BA7;
  }

</style>

<template lang="pug">
  section.Wallet-wrapper
    header.header-wrapper
      h1.page-title 지갑
      .icon-wrapper
        button.user-icon-button.icon-button
          img.user-icon.icon(src="@/assets/img/user-icon.png")

    .my-asm-wrapper
      .title-and-wallet
        .my-asm 잔액
        button.withdraw 출금
      .my-balance 3.535 ASM (14,363 KRW)

    .QRcode-wrapper
      .group-title
        .deposit 입금
        router-link(to="#").copy-link 주소 복사하기
      .group-center
        img.QRcode(src="@/assets/img/qrcode.png")
      .QRcode-text bc1qxy2kgdygjrsqtzq2n0yrf2493p83kkfjhx0wlh
</template>

<script>
export default {

};
</script>
