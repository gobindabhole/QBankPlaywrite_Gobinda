class common {
  constructor(page) {
    this.page = page;
  }

  async invoketheURL(Page) {
    await this.page.goto("https://qbank.accelq.com/", { waitUntil: "load" });
  }
}
export { common };
