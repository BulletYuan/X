'use strict';

const Controller = require('egg').Controller;

class HomeController extends Controller {
  async index() {
    const { ctx } = this;
    // const result = await ctx.service.toutiao.search('钢铁侠');

    // const {
    //   city,
    // } = await ctx.service.ip.ip(); // done
    // const data = await ctx.service.bendibao.news(city); // done

    // const data = await ctx.service.news163.rank(); // done
    // const data = await ctx.service.ifeng.ranks(); // done

    // const data = await ctx.service.cctv.newest(); // done
    // const data = await ctx.service.news163.newest(); // done
    // const data = await ctx.service.haiwainet.newest(); // done
    // const data = await ctx.service.chinanews.newest(); // todo pagination

    // const data = await ctx.service.news163.world(); // todo encoding
    // const data = await ctx.service.news163.domestic(); // todo encoding
    // const data = await ctx.service.cctv.world(); // done
    // const data = await ctx.service.cctv.domestic(); // done
    // const data = await ctx.service.chinanews.world(); // done
    const data = await ctx.service.chinanews.domestic(); // done

    const res = ctx.helper.response(data.status, data.headers, data.data);
    ctx.body = ctx.helper.responseData(res.body);
    ctx.status = res.status;
    Object.keys(res.headers).forEach(el => {
      ctx.set(el, res.headers[el]);
    });
  }
}

module.exports = HomeController;
