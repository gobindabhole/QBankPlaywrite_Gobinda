class homepage {
  constructor(page) {
    this.page = page;
    this.synchelelements = this.page.getByText("Welcome back!");
    this.lblwelcome = this.page.locator("//*[@id='welcome-author']/div[1]");
    this.lblProfile = this.page.locator("//*[@id='profile-qb']");
    this.btnLogout = this.page.locator("//*[@id='right-leftitem']/div[6]");
    this.lblTableTypeAcc = this.page.getByText("Type");
    this.lblCurrentACC = this.page.getByText("Current", { exact: true });
    this.lblSavingAcc = this.page.getByText("Savings", { exact: true });
  }

  async verifyhomepage() {
    if (
      (await this.synchelelements.isVisible()) &&
      (await this.lblwelcome.isVisible()) &&
      (await this.lblProfile.isVisible()) &&
      (await this.btnLogout.isVisible()) &&
      (await this.lblTableTypeAcc.isVisible()) &&
      (await this.lblCurrentACC.isVisible()) &&
      (await this.lblSavingAcc.isVisible())
    ) {
      return true;
    } else return false;
  }
  async performLogout() {
    await this.btnLogout.click();
  }
}

export { homepage };
