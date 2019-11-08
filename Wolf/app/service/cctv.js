'use strict';

const Service = require('egg').Service;
const urls = require('../common/urls');

class CctvService extends Service {
  async requestApi(kw = '', page = 1) {
    const { ctx } = this;
    const url = urls.cctv.api +
      kw + '_' + page + '.jsonp?cb=t&cb=' + kw;
    ctx.helper.log(kw, page, url);
    const result = await ctx.curl(url, {
      method: 'GET',
      gzip: true,
    });
    let content = result.data;
    content = new Buffer(content, 'utf8');
    content = content.toString();
    let data = [];
    let total = 0;
    if (content && content.substr(0, kw.length) === kw) {
      let listOri = content.substring(kw.length + 1, content.length - 1);
      let list = {};
      try {
        list = JSON.parse(listOri);
      } catch (e) {
        new Error('CctvService requestApi Error: ' + e + '\n' + listOri);
      }
      if (list && list.data && list.data.list && list.data.total) {
        total = list.data.total;
        if (list.data.list.length > 0) {
          for (let i = 0; i < list.data.list.length; i++) {
            const item = list.data.list[i];
            const time = Math.floor(new Date(item.focus_date || 0).getTime() / 1000);
            data.push(ctx.helper.dataAssign({
              url: item.url || '',
              topic: item.title || '',
              digest: item.brief || '',
              thumb: item.image || '',
              time,
              keywords: item.keywords || '',
            }));
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