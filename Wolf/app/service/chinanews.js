'use strict';

const Service = require('egg').Service;
const urls = require('../common/urls');

class ChinanewsService extends Service {
  async provinces() {
    const { ctx } = this;
    ctx.helper.log('provinces', urls.chinanews.provinces);
    const result = await ctx.curl(urls.chinanews.provinces, {
      method: 'GET',
      gzip: true,
      dataType: 'text',
    });
    const content = result.data;
    let list = content.match(/syfs4_left\"(.*?)\<\/div/gi)[0];
    list = list.match(/\<a(.*?)\</gi);
    const data = [];
    if (list && list.length > 0) {
      for (let i = 0; i < list.length; i++) {
        const link = list[i];
        const url = link.match(/href\=\"(.*?)\"/gi)[0].replace(/\"/g, '').split('=')[1];
        const city = link.match(/\>(.*?)\</gi)[0].replace(/\>|\</g, '');
        data.push(ctx.helper.dataAssign({
          url, city,
        }));
      }
    }
    return {
      data,
    }
  }

  async newest() {
    const { ctx } = this;
    ctx.helper.log('newest', urls.chinanews.newest);
    const result = await ctx.curl(urls.chinanews.newest, {
      method: 'GET',
      gzip: true,
      dataType: 'text',
    });
    const content = result.data;
    const topNews = content.match(/dd_bt\"\>(.*?)\<\/div/gi);
    const timeList = content.match(/dd_time\"\>(.*?)\<\//gi);
    const keyList = content.match(/dd_lm\"\>(.*?)\<\/div/gi);
    const data = [];
    if (topNews && topNews.length > 0) {
      for (let i = 0; i < topNews.length; i++) {
        const news = topNews[i];
        const link = news.match(/\<a(.*?)\<\/a/gi)[0];
        const url = link.match(/href\=\"(.*?)\"/gi)[0].replace(/\"/g, '').split('=')[1];
        const topic = link.match(/\>(.*?)\</gi)[0].replace(/\>|\</g, '');
        let time = '';
        let keywords = '';
        if (keyList.length === topNews.length) {
          keywords = keyList[i];
          if (keywords) {
            keywords = keywords.match(/\[(.*?)\]/gi)[0]
            keywords = keywords.match(/\>(.*?)\</gi)[0].replace(/\>|\</g, '');
          }
        }
        if (timeList.length === topNews.length) {
          time = timeList[i];
          if (time) {
            time = time.match(/\>(.*?)\</gi)[0].replace(/\>|\</g, '');
            time = new Date().getFullYear() + '-' + time;
            time = Math.floor(new Date(time).getTime() / 1000);
          }
        }
        data.push(ctx.helper.dataAssign({
          url, topic, time,
          keywords,
        }));
      }
    }
    return {
      data,
    };
  }

  async world() {
    const { ctx } = this;
    ctx.helper.log('world', urls.chinanews.world);
    const result = await ctx.curl(urls.chinanews.world, {
      method: 'GET',
      gzip: true,
      dataType: 'text',
    });
    const content = result.data;
    const topNews = content.match(/dd_bt\"\>(.*?)\<\/div/gi);
    const timeList = content.match(/dd_time\"\>(.*?)\<\//gi);
    const data = [];
    if (topNews && topNews.length > 0) {
      for (let i = 0; i < topNews.length; i++) {
        const news = topNews[i];
        const link = news.match(/\<a(.*?)\<\/a/gi)[0];
        const url = 'http://www.chinanews.com' + link.match(/href\=\"(.*?)\"/gi)[0].replace(/\"/g, '').split('=')[1];
        const topic = link.match(/\>(.*?)\</gi)[0].replace(/\>|\</g, '');
        let time = '';
        if (timeList.length === topNews.length) {
          time = timeList[i];
          if (time) {
            time = time.match(/\>(.*?)\</gi)[0].replace(/\>|\</g, '');
            time = new Date().getFullYear() + '-' + time;
            time = Math.floor(new Date(time).getTime() / 1000);
          }
        }
        data.push(ctx.helper.dataAssign({
          url, topic, time,
        }));
      }
    }
    return {
      data,
    };
  }
  async domestic() {
    const { ctx } = this;
    ctx.helper.log('domestic', urls.chinanews.domestic);
    const result = await ctx.curl(urls.chinanews.domestic, {
      method: 'GET',
      gzip: true,
      dataType: 'text',
    });
    const content = result.data;
    const topNews = content.match(/dd_bt\"\>(.*?)\<\/div/gi);
    const timeList = content.match(/dd_time\"\>(.*?)\<\//gi);
    const data = [];
    if (topNews && topNews.length > 0) {
      for (let i = 0; i < topNews.length; i++) {
        const news = topNews[i];
        const link = news.match(/\<a(.*?)\<\/a/gi)[0];
        const url = 'http://www.chinanews.com' + link.match(/href\=\"(.*?)\"/gi)[0].replace(/\"/g, '').split('=')[1];
        const topic = link.match(/\>(.*?)\</gi)[0].replace(/\>|\</g, '');
        let time = '';
        if (timeList.length === topNews.length) {
          time = timeList[i];
          if (time) {
            time = time.match(/\>(.*?)\</gi)[0].replace(/\>|\</g, '');
            time = new Date().getFullYear() + '-' + time;
            time = Math.floor(new Date(time).getTime() / 1000);
          }
        }
        data.push(ctx.helper.dataAssign({
          url, topic, time,
        }));
      }
    }
    return {
      data,
    };
  }
}
module.exports = ChinanewsService;
