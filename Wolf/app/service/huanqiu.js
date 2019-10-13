'use strict';

const Service = require('egg').Service;

class HuanqiuService extends Service {
  async newest() {
    const { ctx } = this;
    const result = await ctx.curl('https://www.huanqiu.com/', {
      method: 'GET',
      gzip: true,
      dataType: 'text',
    });
    const content = result.data;
    const topNews = content.match(/listp\"\>(.*?)\<\/p/gi);
    const newList = content.match(/thrNewsList\"\>(.*?)\<\/dl/gi);
    const newList2 = content.match(/newsDis\"\>(.*?)\<\/dl/gi);
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
    if (newList && newList.length > 0) {
      for (let i = 0; i < newList.length; i++) {
        const news = newList[i];
        const link = news.match(/\<a(.*?)\<\/a/gi)[0];
        const url = link.match(/href\=\"(.*?)\"/gi)[0].replace(/\"/g, '').split('=')[1];
        const topic = link.match(/\>(.*?)\</gi)[0].replace(/\>|\</g, '');
        data.push({
          url, topic,
        });
        if (newList2.length === newList.length && newList2[i]) {
          const news = newList2[i];
          const link = news.match(/\<a(.*?)\<\/a/gi)[0];
          const url = link.match(/href\=\"(.*?)\"/gi)[0].replace(/\"/g, '').split('=')[1];
          const topic = link.match(/\>(.*?)\</gi)[0].replace(/\>|\</g, '');
          data.push({
            url, topic,
          });
        }
      }
    }
    return {
      data,
    };
  }
}
module.exports = HuanqiuService;
