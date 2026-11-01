class fundTransfer {
  constructor(page) {
    this.page = page;
    this.lblTransferFunds = this.page.getByText("Transfer Funds");
    this.ddlTransferFrom = this.page.getByLabel("Transfer from");
    this.ddlTransferTo = this.page.locator("//*[@id='qbf-toaccount-input']");
    this.txtAmount = this.page.getByRole("textbox", { name: "Amount ($)" });
    this.txtdate = this.page.getByRole("textbox", { name: "Date of Transfer" });
    this.txtmemo = this.page.getByRole("textbox", { name: "Memo" });
    this.optionONeTime = this.page.getByText("One-time", { exact: true });
    this.optionRepeting = this.page.getByText("Repeating", { exact: true });
    this.btnsubmit = this.page.getByRole("button", { name: "Submit" });
    this.btncancel = this.page.getByRole("button", { name: "Cancel" });
    this.lblConfirmation = this.page.locator("//*[@id='qbf-conf']");
    this.lblrefID = this.page.locator("//*[@id='ref_id_input']");
  }

  async verifyFundTransferPage() {
    return await this.lblTransferFunds.isVisible();
  }
  async submitingFundTransfer(
    TransferFrom,
    TransferTo,
    Amount,
    Date,
    Memo,
    Times,
  ) {
    await this.ddlTransferFrom.selectOption(TransferFrom);
    // await this.page.waitForTimeout(3000);
    await this.ddlTransferTo.click();
    await this.ddlTransferTo.selectOption(TransferTo);
    // await this.page.waitForTimeout(3000);
    await this.txtAmount.fill(Amount);
    // await this.page.waitForTimeout(3000);
    await this.txtdate.fill(Date);
    // await this.page.waitForTimeout(3000);
    await this.txtmemo.fill(Memo);
    // await this.page.waitForTimeout(3000);
    if (Times.includes("Onetime")) {
      await this.optionONeTime.click();
    } else {
      await this.optionRepeting.click();
    }
    await this.btnsubmit.click();
  }

  async verifyTheDetailsOfFundTransferWithConfirmation(
    transferFrom,
    TransferTo,
    Amount,
  ) {
    var textInConfirmation = await this.lblConfirmation.textContent();
    if (
      textInConfirmation.includes(transferFrom) &&
      textInConfirmation.includes(TransferTo) &&
      textInConfirmation.includes(Amount)
    ) {
      return true;
    } else {
      return false;
    }
  }
  async getTheReferenceID() {
    const refID = await this.lblrefID.textContent();
    return refID;
  }
}
export { fundTransfer };
