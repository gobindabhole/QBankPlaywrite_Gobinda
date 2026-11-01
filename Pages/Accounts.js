class AccountsPage {
  constructor(page) {
    this.page = page;
    this.secActivity = this.page.locator(
      "//*[contains(@class, 'qbl-leftnav-item')]",
    );
  }

  async navigateToSpecifiedActivity(activityName) {
    await this.secActivity.filter({ hasText: activityName }).click();
  }
}
export { AccountsPage };
