'use strict';

const Service = require('egg').Service;

class ChinanewsService extends Service {
  async provinces() {
    const { ctx } = this;
    const result = await ctx.curl('http://www.chinanews.com/', {
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
        data.push({
          url, city,
        });
      }
    }
    return {
      data,
    }
  }

  async newest() {
    const { ctx } = this;
    const result = await ctx.curl('http://www.chinanews.com/scroll-news/news1.html', {
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
        const url = 'http:' + link.match(/href\=\"(.*?)\"/gi)[0].replace(/\"/g, '').split('=')[1];
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
        data.push({
          url, topic, time,
          // keywords,
        });
      }
    }
    return {
      data,
    };
  }

  async world() {
    const { ctx } = this;
    const result = await ctx.curl('http://www.chinanews.com/world.shtml', {
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
        data.push({
          url, topic, time,
        });
      }
    }
    return {
      data,
    };
  }
  async domestic() {
    const { ctx } = this;
    const result = await ctx.curl('http://www.chinanews.com/china.shtml', {
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
        data.push({
          url, topic, time,
        });
      }
    }
    return {
      data,
    };
  }
}
module.exports = ChinanewsService;
