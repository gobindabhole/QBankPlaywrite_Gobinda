class Branches {
  constructor(page) {
    this.page = page;
    this.lblHeaderinBranches = this.page.locator(
      "//*[@id='main-body']/div[1]/div/div[2]/div[1]",
    );

    this.txtBranchSearch = this.page.locator("//*[@id='branch-input']");

    this.btnSearchBranch = this.page.locator(
      "//*[@id='main-body']/div[1]/div/div[2]/div[2]/form/button",
    );

    this.secBankdetailes = this.page.locator(
      "//*[@id='main-body']/div[2]/div/div[2]/div[1]",
    );

    this.lblphoneNumer = this.page.locator("//*[@id='phone-sec']/span[2]");
  }

  async searchWithLocation(BranchName) {
    await this.txtBranchSearch.fill(BranchName);
    await this.btnSearchBranch.click();
  }
  async verifyThePhoneNumberWithBranch(InPhoneNumber) {
    const phoneNumber = this.lblphoneNumer.textContent();
    if (InPhoneNumber === phoneNumber) {
      return true;
    } else {
      return false;
    }
  }
}
export { Branches };
