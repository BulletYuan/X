'use strict';

const puppeteer = require('puppeteer');

module.exports = {
  response(status = 200, headers = {}, body = []) {
    status = Number(status) || 200;
    headers = Object.keys(headers).length > 0 ? headers : {
      'Content-Type': 'application/json; charset=utf-8',
    };
    body = body || [];
    return {
      status, headers, body,
    };
  },
  responseData(data, msg = 'success') {
    const result = {
      state: 0,
      data,
      msg,
    };
    return result;
  },

  ioFormat(action, errMsg = null) {
    let metadata;
    if (errMsg == null) {
      metadata = {
        state: 1,
        msg: '',
      };
    } else {
      metadata = {
        state: 0,
        msg: errMsg,
      };
    }
    const meta = Object.assign({}, {
      timestamp: Date.now(),
    }, metadata);

    return {
      meta,
      data: {
        action,
      },
    };
  },

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