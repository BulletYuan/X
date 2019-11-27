'use strict';

const Service = require('egg').Service;
const urls = require('../common/urls');

class BendibaoService extends Service {
  async list() {
    const { ctx } = this;
    ctx.helper.log('bendibao.cities', urls.bendibao.cities);
    const result = await ctx.helper.curl(urls.bendibao.cities, {
      method: 'GET',
      gzip: true,
      dataType: 'text',
    });
    const content = result.data;
    const list = content.match(/http\:(.*)\<\/a/gi);
    let data = [];
    if (list) {
      data = list.map(el => {
        el = el.replace(/\<\/a/g, '').replace(/\"/g, '').split('>');
        return {
          url: el[0],
          city: el[1],
        };
      });
    }
    return {
      data,
    };
  }

  async news(city) {
    const { ctx } = this;
    const list = await this.list();
    const cities = list.data;
    const len = cities.length;
    let url = '';
    for (let i = len - 1; i >= 0; i--) {
      const c = cities[i];
      if (city.indexOf(c.city) >= 0) {
        url = c.url;
        break;
      }
    }
    let data = [];
    if (url) {
      url += 'news/';
      ctx.helper.log('Bendibao news', url);
      const result = await ctx.helper.curl(url, {
        method: 'GET',
        gzip: true,
        dataType: 'text',
      });
      const content = result.data;
      const list = content.match(/\<a target\=(.*?)\<\/a/gi);
      data = list.map(el => {
        if (el.indexOf('target') > 0 && el.indexOf('.shtm') > 0) {
          el = el.replace(/\'/g, '"');
          const url = el.match(/href\=\"(.*)\"/g) ? el.match(/href\=\"(.*)\"/g)[0].replace(/\"/g, '').split('=')[1] : '';
          const topic = el.match(/\>(.*)\<\/a/g) ? el.match(/\>(.*)\<\/a/g)[0].replace(/\<\/a/i, '').replace(/\>/i, '') : '';
          return ctx.helper.dataAssign({
            url, topic,
          });
        }
      });
    }
    return {
      data,
    };
  }

  async newsPage(url) {
    const { ctx } = this;
    ctx.helper.log('Bendibao news PAGE', url);
    const result = await ctx.helper.curl(url, {
      method: 'GET',
      gzip: true,
      dataType: 'text',
    });
    const page = result.data;
    let topic = page.match(/\<h1*\>(.*?)\<\/h1\>/gi) || [];
    let leads = page.match(/\<div class\=\"leading\"\>(.*?)\<\/div\>/gi) || [];
    let content = page.match(/id\=\"bo\"\>(.*?)\<\/div\>/gi) || [];
    const htmlReg = /<script(([\s\S])*?)\<\/script>|<[^>]*>/gi;
    const imgReg = /\<img(.*?)\>/gi;
    if (topic) {
      topic = topic[0] || '';
      topic = topic.replace(htmlReg, '');
    }
    if (leads) {
      leads = leads[0] || '';
      leads = leads.replace(htmlReg, '');
    }
    if (content) {
      content = content[0] ? '<' + content[0] : '';
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
      content = content.replace(htmlReg, '\n');
    }
    const data = ctx.helper.pageAssign({
      topic, leads, content
    });
    ctx.helper.log('Bendibao news PAGE DONE', topic, data.hash);
    return {
      data,
    };
  }
}
module.exports = BendibaoService;
