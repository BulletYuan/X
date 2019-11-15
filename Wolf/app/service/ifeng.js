'use strict';

const Service = require('egg').Service;
const urls = require('../common/urls');

class IfengService extends Service {
  async ranks() {
    const { ctx } = this;
    ctx.helper.log('newest', urls.ifeng.ranks);
    const result = await ctx.helper.curl(urls.ifeng.ranks, {
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

  async newsPage(url) {
    const { ctx } = this;
    ctx.helper.log('Ifeng news PAGE', url);
    const result = await ctx.helper.curl(url, {
      method: 'GET',
      gzip: true,
      dataType: 'text',
    });
    const page = result.data;
    let topic = page.match(/\<h1 class\=\"topic\-(([\s\S])*?)\<\/h1\>/gi) || [];
    let content = page.match(/\<div class\=\"main\_content\-(([\s\S])*?)\<\/div\>/gi) || [];
    const htmlReg = /<script(([\s\S])*?)\<\/script>|<[^>]*>/gi;
    const imgReg = /\<img(.*?)\>/gi;
    const vidReg = /\<video(.*?)\>/gi;
    if (topic) {
      topic = topic[0] || '';
      topic = topic.replace(htmlReg, '');
    }
    if (content) {
      content = content[0] || '';
      const imgsOri = content.match(imgReg) || [];
      const imgs = imgsOri.map((el, i) => {
        let name = el.match(/alt\=\"(.*?)\"/gi) || '';
        let src = el.match(/src\=\"(.*?)\"/gi) || '';
        name = name[0] ? name[0].split('=')[1].replace(/\"|\'/gi, '') : ('image' + i);
        src = src[0] ? src[0].split('=')[1].replace(/\"|\'/gi, '') : '';
        return `[${name}](${src})`;
      });
      imgsOri.forEach((el, i) => {
        content = content.replace(el, (imgs[i] || ''));
      });
      const vidsOri = content.match(vidReg) || [];
      const vids = vidsOri.map((el, i) => {
        let name = el.match(/alt\=\"(.*?)\"/gi) || '';
        let src = el.match(/src\=\"(.*?)\"/gi) || '';
        name = name[0] ? name[0].split('=')[1].replace(/\"|\'/gi, '') : ('video' + i);
        src = src[0] ? src[0].split('=')[1].replace(/\"|\'/gi, '') : '';
        return `[${name}](${src})`;
      });
      vidsOri.forEach((el, i) => {
        content = content.replace(el, (vids[i] || ''));
      });
      content = content.replace(htmlReg, '\n');
    }
    const data = ctx.helper.pageAssign({
      topic, content
    });
    ctx.helper.log('Ifeng news PAGE DONE', topic, data.hash);
    return {
      data,
    };
  }
}
module.exports = IfengService;
