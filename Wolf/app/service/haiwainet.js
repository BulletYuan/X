'use strict';

const Service = require('egg').Service;
const urls = require('../common/urls');

class HaiwaiService extends Service {
  async newest() {
    const { ctx } = this;
    ctx.helper.log('newest', urls.haiwai.newest);
    const result = await ctx.helper.curl(urls.haiwai.newest, {
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

  async newsPage(url) {
    const { ctx } = this;
    ctx.helper.log('Haiwainet news PAGE', url);
    const result = await ctx.helper.curl(url, {
      method: 'GET',
      gzip: true,
      dataType: 'text',
    });
    const page = result.data;
    let topic = page.match(/\<h1 class\=\"show_wholetitle\"(([\s\S])*?)\<\/h1\>/gi) || [];
    let leads = page.match(/\<h2 class\=\"(show_contentitle|show_shorttitle)\"(([\s\S])*?)\<\/h2\>/gi) || [];
    let content = page.match(/\<div class\=\"contentMain\"(([\s\S])*?)\<\/div\>/gi) || [];
    const htmlReg = /<script(([\s\S])*?)\<\/script>|<[^>]*>/gi;
    const imgReg = /\<img(.*?)\>/gi;
    if (topic) {
      topic = topic[0] || '';
      topic = topic.replace(htmlReg, '');
    }
    if (leads) {
      leads = leads[0] + leads[1] || '';
      leads = leads.replace(htmlReg, '');
    }
    if (content) {
      content = content[0] || '';
      const imgsOri = content.match(imgReg) || [];
      const imgs = imgsOri.map((el, i) => {
        let name = el.match(/alt\=\"(.*?)\"/gi) || '';
        let src = el.match(/src\=\"(.*?)\"/gi) || '';
        name = name[0] ? name[0].split('=')[1].replace(/\"|\'/gi, '') : ('image' + i);
        src = (src[0] || '').split('=')[1].replace(/\"|\'/gi, '');
        return `[${name}](${src})`;
      });
      imgsOri.forEach((el, i) => {
        content = content.replace(el, (imgs[i] || ''));
      });
      content = content.replace(htmlReg, '\n');
    }
    const data = ctx.helper.pageAssign({
      topic, leads, content
    });
    ctx.helper.log('Haiwainet news PAGE DONE', topic, data.hash);
    return {
      data,
    };
  }
}
module.exports = HaiwaiService;