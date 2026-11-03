class AccountActivity {
  constructor(page) {
    this.page = page;
    this.lblHeaderAccountActivity = page.locator("//*[@id='main-header']");
    this.ddlTransactionType = page.locator("//*[@id='TransactionType']");
    this.ddlTransactionStatus = page.locator("//*[@id='TransactionStatus']");
    this.txtTransactionDate = page.locator("//*[@id='TransactionDateRange']");
    this.ddlTransactionAccount = page.locator("//*[@id='TransactionAccount']");
    this.txtMinTransactionAmount = page.locator(
      "(//*[@id='MinTransactionAmount'])[1]",
    );
    this.txtMaxTransactionAmount = page.locator(
      "(//*[@id='MinTransactionAmount'])[2]",
    );
    this.btn_Search = page.locator("//*[@id='qba-gridBox']/div[7]/div/button");
    this.secTransactiones = page.locator(
      "//*[@class='row qb-no-xmargin qba-td ng-scope']",
    );
    this.btnLogout = page.locator("//*[@id='right-leftitem']/div[6]");
  }
  async filteringtheTransaction(
    TransactionType,
    TransactionStatus,
    TransactionDate,
    TransactionAccount,
    MinTransactionAmount,
    MaxTransactionAmount,
  ) {
    await this.ddlTransactionType.selectOption(TransactionType);
    await this.ddlTransactionStatus.selectOption(TransactionStatus);
    await this.txtTransactionDate.fill(TransactionDate);
    await this.ddlTransactionAccount.selectOption(TransactionAccount);
    await this.txtMinTransactionAmount.fill(MinTransactionAmount);
    await this.txtMaxTransactionAmount.fill(MaxTransactionAmount);
    await this.btn_Search.click();
  }

  async getTheNumberOfTransactions() {
    const transactionCount = await this.secTransactiones.count();
    return transactionCount;
  }
}
export { AccountActivity };
