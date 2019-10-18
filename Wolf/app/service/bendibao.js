'use strict';

const Service = require('egg').Service;

class BendibaoService extends Service {
  async list() {
    const { ctx } = this;
    const result = await ctx.curl('http://www.bendibao.com/city.htm', {
      method: 'GET',
      gzip: true,
      dataType: 'text',
    });
    const content = result.data;
    const list = content.match(/http\:(.*)\<\/a/gi);
    const data = list.map(el => {
      el = el.replace(/\<\/a/g, '').replace(/\"/g, '').split('>');
      return {
        url: el[0],
        city: el[1],
      };
    });
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
      const result = await ctx.curl(url, {
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
}
module.exports = BendibaoService;
