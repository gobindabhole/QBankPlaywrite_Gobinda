class LinkCreditCard {
  constructor(page) {
    this.page = page;
    this.lblHeadingLinkCreditCard = page.locator(
      "//*[@id='qbf-LinkAcc-box']/div[1]",
    );
    this.txtCreditCardNumber = page.locator(
      "//*[@id='qbf-card-box']/div[2]/*[contains(@id, 'input')]",
    );
    this.txtCVV = page.locator(
      "//*[@id='qbf-verify-box']/form/div/div[2]/div[2]/input",
    );
    this.txtValidDate = page.locator(
      "//*[@id='qbf-verify-box']/form/div/div[3]/div[2]//*[contains(@id, 'input')]",
    );
    this.btnVerify = page.locator("//*[@id='sub-qb']");
    this.lblInvalidCreditcard = page.getByText("Invalid Credit Card number");
    this.lblInvalidCVV = page.getByText("Invalid CVV");
    this.btn_Logout = page.locator("//*[@id='right-leftitem']/div[6]");
  }

  async VerifyCreditCardWithCardDetailes(cardnumber, CVV, Date) {
    cardnumber = cardnumber.toString();
    var date = Date.toString().split("/");
    let v = 0;
    while (v < cardnumber.length) {
      let num = cardnumber.substring(v, v + 4);

      await this.txtCreditCardNumber.nth(v / 4).fill(num);
      v = v + 4;
    }
    await this.txtCVV.fill(CVV);
    await this.txtValidDate.nth(0).fill(date[0]);
    await this.txtValidDate.nth(1).fill(date[1]);
    await this.btnVerify.click();
  }

  async verifyTheInValidMsgappering() {
    if (
      (await this.lblInvalidCreditcard.isVisible()) &&
      (await this.lblInvalidCreditcard.isVisible())
    ) {
      return "both Credit card and CVV is invalid";
    } else if (await this.lblInvalidCreditcard.isVisible()) {
      return "Only Credit card is invalid";
    } else if (await this.lblInvalidCVV.isVisible()) {
      return "only CVV is invalid";
    } else {
      return "All fields are valid";
    }
  }
}
export { LinkCreditCard };
