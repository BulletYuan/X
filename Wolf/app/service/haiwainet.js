'use strict';

const Service = require('egg').Service;

class HaiwaiService extends Service {
  async newest() {
    const { ctx } = this;
    const result = await ctx.curl('http://news.haiwainet.cn/yuanchuang/', {
      method: 'GET',
      gzip: true,
      dataType: 'text',
    });
    const content = result.data;
    const topNews = content.match(/li\>(.*)\<\/li/gi);
    const data = [];

    if (topNews && topNews.length > 0) {
      for (let i = 0; i < topNews.length; i++) {
        const news = topNews[i];
        const link = news.match(/\<a(.*?)\<\/a/gi)[0];
        const url = link.match(/href\=\"(.*?)\"/gi) ? link.match(/href\=\"(.*?)\"/gi)[0].replace(/\"/g, '').split('=')[1] : '';
        const topic = link.match(/\>(.*?)\</gi) ? link.match(/\>(.*?)\</gi)[0].replace(/\>|\</g, '') : '';
        let time = link.match(/span\>(.*?)\</gi);
        if (time && time.length > 0) {
          time = time[0].match(/\>(.*?)\</gi)[0].replace(/\<|\>/gi, '');
          time = Math.floor(new Date(time).getTime() / 1000);
        } else {
          time = Math.floor(new Date().getTime() / 1000);
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
module.exports = HaiwaiService;