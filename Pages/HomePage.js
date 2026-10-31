class homepage {
  constructor(page) {
    this.page = page;
    this.synchelelements = this.page.getByText("Welcome back!");
  }

  async verifyhomepage() {
    return await this.synchelelements.isVisible();
  }
}

export { homepage };
