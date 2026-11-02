class billpayment {
  constructor(page) {
    this.page = page;
    this.lblHeaderBillpayment = this.page.locator(
      "//*[@id='qbf-bil-box']/div[1]",
    );
    this.txtTransferFrom = this.page.locator(
      "(//*[@id='qdf-fill-box']/div[2]/input)[1]",
    );
    this.ddlElectricbill = this.page.getByRole("link", {
      name: "Select a bill",
    });
    this.optionbillType = this.page.locator(
      "//*[@id='qdf-fill-box']/div[2]/div[1]/ul/li",
    );
    this.txtAmount = this.page.locator(
      "(//*[@id='qdf-fill-box']/div[2]/input)[2]",
    );
    this.txttransactionDate = this.page.locator(
      "//*[@id='TransactionDateRange']",
    );
    this.btnVerify = this.page.locator("//*[@id='sub-qb']");
    this.btnConfirm = this.page.getByRole("button", { name: "Confirm" });
    this.lblConfirmationrecepit = this.page.locator(
      "//*[@id='billing-recipt']",
    );
    this.btnGoToAccountSummary = this.page.locator("//*[@id='sub-qb']");
  }

  async submitingBillpayment(TransferFrom, BillType, TransactionDate, Amount) {
    await this.txtTransferFrom.fill(TransferFrom);
    await this.ddlElectricbill.click();
    await this.optionbillType.filter({ hasText: BillType }).click();
    await this.txttransactionDate.fill(TransactionDate);
    await this.txtAmount.fill(Amount);
    await this.btnVerify.click();
    await this.btnConfirm.waitFor({ state: "visible" });
    await this.btnConfirm.click();
    await this.lblConfirmationrecepit.waitFor({ state: "visible" });
    await this.btnGoToAccountSummary.waitFor({ state: "visible" });
    await this.btnGoToAccountSummary.click();
  }
}
export { billpayment };
