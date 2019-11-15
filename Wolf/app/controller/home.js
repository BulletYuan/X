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

    // const data = await ctx.service.grab.Urls(); // done

    // const data = await ctx.service.bendibao.newsPage('http://cd.bendibao.com/news/2019924/105087.shtm'); // done
    // const data = await ctx.service.cctv.newsPage('http://news.cctv.com/2019/11/07/ARTIDwNZALOOPiybO58QydIH191107.shtml'); // done
    // const data = await ctx.service.cctv.newsPage('http://photo.cctv.com/2019/11/08/PHOASBIfocWCtxSqzCMiQ8WG191108.shtml#NzfJx7SI6ZQP191108_1'); // done
    // const data = await ctx.service.cctv.newsPage('http://military.cctv.com/2019/11/01/ARTI3kJYxPeYvYEqaiiBNBdj191101.shtml'); // done
    // const data = await ctx.service.chinanews.newsPage('http://www.chinanews.com/hr/2019/11-14/9007287.shtml'); // done
    // const data = await ctx.service.haiwainet.newsPage('http://news.haiwainet.cn/n/2019/1108/c3541093-31660684.html'); // done
    // const data = await ctx.service.huanqiu.newsPage('https://finance.huanqiu.com/article/7RqFgJ6D9II'); // done
    // const data = await ctx.service.ifeng.newsPage('https://news.ifeng.com/c/7rP4sebFw4D'); // done
    const data = await ctx.service.news163.newsPage('https://news.163.com/19/1107/01/ETBI599P0001875P.html'); // done

    const res = ctx.helper.response(data.status, data.headers, data.data);
    ctx.body = ctx.helper.responseData(res.body);
    ctx.status = res.status;
    Object.keys(res.headers).forEach(el => {
      ctx.set(el, res.headers[el]);
    });

  }
}

module.exports = HomeController;
