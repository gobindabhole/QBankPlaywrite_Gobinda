class loginPage {
  constructor(page) {
    this.page = page;
    this.txt_username = this.page.getByRole("textbox", { name: "Username" });
    this.txt_password = this.page.getByRole("textbox", { name: "Password" });
    this.btn_login = this.page.getByRole("button", { name: "Sign In" });
  }
  async navigateToLoginPage(username, password) {
    await this.txt_username.fill(username);
    await this.page.waitForTimeout(2000);
    await this.txt_password.fill(password);
    await this.page.waitForTimeout(2000);
    await this.btn_login.click();
    await this.page.waitForTimeout(2000);
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
}
export { loginPage };
