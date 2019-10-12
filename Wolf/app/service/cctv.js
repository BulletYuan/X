'use strict';

const Service = require('egg').Service;

class CctvService extends Service {
  async requestApi(kw = '', page = 1) {
    const { ctx } = this;
    const result = await ctx.curl('http://news.cctv.com/2019/07/gaiban/cmsdatainterface/page/' +
      kw + '_' + page + '.jsonp?cb=t&cb=' + kw, {
      method: 'GET',
      gzip: true,
    });
    let content = result.data;
    content = new Buffer(content, 'utf8');
    content = content.toString();
    let data = [];
    let total = 0;
    if (content && content.substr(0, kw.length) === kw) {
      let list = content.substring(kw.length + 1, content.length - 1);
      list = JSON.parse(list);
      if (list && list.data && list.data.list && list.data.total) {
        total = list.data.total;
        if (list.length > 0) {
          for (let i = 0; i < list.length; i++) {
            const item = list[i];
            const time = Math.floor(new Date(item.focus_date || 0).getTime() / 1000);
            data.push({
              url: item.url || '',
              topic: item.title || '',
              digest: item.brief || '',
              thumb: item.image || '',
              time,
              // keys: item.keywords || '',
            });
          }
        }
      }
    }
    return {
      data, total,
    };
  }

  async newest() {
    let { data, total } = await this.requestApi('news');
    if (total > 0 && data.length > 0) {
      const pages = Math.ceil(total / data.length);
      if (pages > 1) {
        const queue = [];
        for (let i = 0; i < pages - 1; i++) {
          const prms = new Promise(async res => {
            const newData = await this.requestApi('news', 2 + i);
            if (newData.total > 0) {
              res(newData.data);
            } else {
              res([]);
            }
          });
          queue.push(prms);
        }
        const datas = await Promise.all(queue);
        data = data.concat(...datas);
      }
    }
    return {
      data,
    };
  }

  async world() {
    let { data, total } = await this.requestApi('world');
    if (total > 0 && data.length > 0) {
      const pages = Math.ceil(total / data.length);
      if (pages > 1) {
        const queue = [];
        for (let i = 0; i < pages - 1; i++) {
          const prms = new Promise(async res => {
            const newData = await this.requestApi('world', 2 + i);
            if (newData.total > 0) {
              res(newData.data);
            } else {
              res([]);
            }
          });
          queue.push(prms);
        }
        const datas = await Promise.all(queue);
        data = data.concat(...datas);
      }
    }
    return {
      data,
    };
  }

  async domestic() {
    let { data, total } = await this.requestApi('china');
    if (total > 0 && data.length > 0) {
      const pages = Math.ceil(total / data.length);
      if (pages > 1) {
        const queue = [];
        for (let i = 0; i < pages - 1; i++) {
          const prms = new Promise(async res => {
            const newData = await this.requestApi('china', 2 + i);
            if (newData.total > 0) {
              res(newData.data);
            } else {
              res([]);
            }
          });
          queue.push(prms);
        }
        const datas = await Promise.all(queue);
        data = data.concat(...datas);
      }
    }
    return {
      data,
    };
  }
}
module.exports = CctvService;