'use strict';

const Service = require('egg').Service;
const urls = require('../common/urls');

class HaiwaiService extends Service {
  async newest() {
    const { ctx } = this;
    ctx.helper.log('newest', urls.haiwai.newest);
    const result = await ctx.curl(urls.haiwai.newest, {
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
        let time = news.match(/span\>(.*?)\<\/span/gi);
        if (time && time.length > 0) {
          time = time[0].match(/\>(.*?)\</gi)[0].replace(/\<|\>/gi, '');
          time = time.replace(/年|月/g, '-').replace('日', '');
          time = Math.floor(new Date(time).getTime() / 1000);
        } else {
          time = '';
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
module.exports = HaiwaiService;