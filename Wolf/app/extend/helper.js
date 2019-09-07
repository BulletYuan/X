'use strict';

const puppeteer = require('puppeteer');

module.exports = {
  Browser: null,
  async getBrowser() {
    if (!this.Browser) {
      this.Browser = await puppeteer.launch();
    }
    return this.Browser;
  },
  async closeBrowser() {
    if (this.Browser) {
      await this.Browser.close();
      this.Browser = null;
    }
  },
  async getPage(url) {
    const page = await this.Browser.newPage();
    await page.goto(url);
    return page;
  },
  async closePage(page) {
    if (page && page instanceof puppeteer.Page) {
      await page.close();
    }
  },
  async closeAllPages() {
    if (this.Browser) {
      const pages = await this.Browser.pages();
      pages.forEach(async page => {
        await page.close();
      });
    }
  },
};
