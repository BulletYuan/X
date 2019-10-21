'use strict';

const Service = require('egg').Service;

class IfengService extends Service {
  async ranks() {
    const { ctx } = this;
    const result = await ctx.curl('http://news.ifeng.com/', {
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
        data.push(ctx.helper.dataAssign({
          url, topic,
        }));
      }
    }
    return {
      data,
    };
  }
}
module.exports = IfengService;
