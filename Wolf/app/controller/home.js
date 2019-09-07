'use strict';

const Controller = require('egg').Controller;

class HomeController extends Controller {
  async index() {
    const { ctx } = this;
    const result = await ctx.service.toutiao.search('钢铁侠');
    ctx.body = result;
  }
}

module.exports = HomeController;
