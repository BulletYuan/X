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
    const topNews = content.match(/top_news_title(.*?)\<\/h3/gi);
    const data = [];
    if (topNews && topNews.length > 0) {
      for (let i = 0; i < topNews.length; i++) {
        const news = topNews[i];
        const link = news.match(/\<a(.*?)\<\/a/gi)[0];
        const url = link.match(/href\=\"(.*?)\"/gi)[0].replace(/\"/g, '').split('=')[1];
        const topic = link.match(/\>(.*?)\</gi)[0].replace(/\>|\</g, '');
        data.push({
          url, topic,
        });
      }
    }
    return {
      data,
    };
  }
}
module.exports = ChinanewsService;
