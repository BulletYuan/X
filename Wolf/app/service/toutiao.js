'use strict';

const Service = require('egg').Service;

class TouTiaoService extends Service {
  async search(queryStr = '') {
    const { ctx } = this;
    await ctx.helper.getBrowser();
    const page = await ctx.helper.getPage('https://www.toutiao.com/search/?keyword=' + queryStr);
    // await page.type('input.tt-input__inner', queryStr, { delay: 250 });
    // await page.tap('button.tt-button.tt-button--default');
    const content = await page.content();
    return content;
  }
}

module.exports = TouTiaoService;
