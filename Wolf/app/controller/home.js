'use strict';

const Controller = require('egg').Controller;

class HomeController extends Controller {
  async index() {
    const { ctx } = this;
    // const result = await ctx.service.toutiao.search('钢铁侠');

    // const data = await ctx.service.bendibao.news('重庆'); // done
    const data = await ctx.service.news163.rank(); // done

    const res = ctx.helper.response(data.status, data.headers, data.data);
    ctx.body = ctx.helper.responseData(res.body);
    ctx.status = res.status;
    Object.keys(res.headers).forEach(el => {
      ctx.set(el, res.headers[el]);
    });
  }
}

module.exports = HomeController;
