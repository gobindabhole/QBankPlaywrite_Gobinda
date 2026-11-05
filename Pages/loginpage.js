class loginPage {
  constructor(page) {
    this.page = page;
    this.txt_username = this.page.getByRole("textbox", { name: "Username" });
    this.txt_password = this.page.getByRole("textbox", { name: "Password" });
    this.btn_login = this.page.locator(
      "//*[@id='qb-signin-below']/div[2]/button",
    );
    this.lblinvalidcredential = this.page.getByText(
      "Invalid Username/Password",
    );
    this.ink_navbarINLogin = this.page.locator(
      "//*[contains(@class, 'qb-navbar-menuitem')]",
    );
  }
  async navigateToLHomePage(username, password) {
    await this.txt_username.fill(username);
    await this.page.waitForTimeout(1000);
    await this.txt_password.fill(password);
    await this.page.waitForTimeout(1000);
    await this.btn_login.click();
    // await this.page.waitForTimeout(000);
  }
  async verifyLoginPage() {
    if (
      (await this.txt_username.isVisible()) &&
      (await this.txt_password.isVisible()) &&
      (await this.btn_login.isVisible())
    ) {
      return true;
    } else return false;
  }
  async navigateToSpicifiedNavbar(navbarname) {
    await this.ink_navbarINLogin.filter({ hasText: navbarname }).click();
  }
}
export { loginPage };
