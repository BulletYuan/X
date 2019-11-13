'use strict';

const Controller = require('egg').Controller;
const fs = require('fs');


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
    // const data = await ctx.service.huanqiu.newest(); // done

    // const data = await ctx.service.news163.world(); // done
    // const data = await ctx.service.news163.domestic(); // done
    // const data = await ctx.service.cctv.world(); // done
    // const data = await ctx.service.cctv.domestic(); // done
    // const data = await ctx.service.chinanews.world(); // done
    // const data = await ctx.service.chinanews.domestic(); // done

    // const data = await ctx.service.dbUrlPool.find({
    //   topic: 'test',
    //   state: 0,
    // });
    // const data = await ctx.service.dbUrlPool.insert({
    //   url: 'test',
    //   topic: 'test',
    //   time: 100,
    // });
    // const data = await ctx.service.dbUrlPool.insertArray([{
    //   url: 'test',
    //   topic: 'test',
    //   time: 1002,
    // }, {
    //   url: 'test',
    //   topic: 'test',
    //   time: 1001,
    // }]);
    // const data = await ctx.service.dbUrlPool.update({
    //   url: 'test1',
    //   topic: 'test',
    //   time: 10,
    // }, {
    //   id: 4,
    // });
    // const data = await ctx.service.dbUrlPool.update({
    //   url: 'test1',
    //   topic: 'test',
    //   time: 10,
    // }, {
    //   id: 4,
    // });

    const data = await ctx.service.grab.Urls();

    const res = ctx.helper.response(data.status, data.headers, data.data);
    ctx.body = ctx.helper.responseData(res.body);
    ctx.status = res.status;
    Object.keys(res.headers).forEach(el => {
      ctx.set(el, res.headers[el]);
    });

  }
}

module.exports = HomeController;
