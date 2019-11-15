'use strict';

const Service = require('egg').Service;
const urls = require('../common/urls');

class CctvService extends Service {
  async requestApi(kw = '', page = 1) {
    const { ctx } = this;
    const url = urls.cctv.api +
      kw + '_' + page + '.jsonp?cb=t&cb=' + kw;
    ctx.helper.log('CCTV' + kw, 'page:' + page, url);
    const result = await ctx.helper.curl(url, {
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
        ctx.helper.error('CctvService requestApi Error: ' + e);
        new Error('CctvService requestApi Error: ' + e + '\n');
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

  async newsPage(url) {
    const { ctx } = this;
    url = url.replace('shtml', 'xml');
    ctx.helper.log('CCTV news PAGE', url);
    const result = await ctx.helper.curl(url, {
      method: 'GET',
      gzip: true,
      dataType: 'text',
    });
    const page = result.data;
    let topic = '';
    let leads = '';
    let content = '';
    let isPhoto = url.indexOf('photo') >= 0;
    if (isPhoto) {
      topic = page.match(/title\=\"(.*?)\"/gi)[0].split('=')[1].replace(/\"|\'/gi, '');
      let imgs = page.match(/photourl\=\"(.*?)\"/gi) || [];
      let desc = page.match(/\<\!\[CDATA\[(.*?)\]\]>/gi) || [];
      content = imgs.map((el, i) => {
        return `${desc[i].replace(/\[|\]|\<|\>|CDATA|\!/gi, '')}\n[image${i}](${el.split('=')[1].replace(/\"|\'/gi, '')})`;
      }).join('\n');
    } else {
      topic = page.match(/\<title(([\s\S])*?)\<\/title\>/gi) || [];
      leads = page.match(/\<desc(([\s\S])*?)\<\/desc\>/gi) || [];
      content = page.match(/\<content(([\s\S])*?)\<\/content\>/gi) || [];
    }
    if (content && !isPhoto) {
      topic = topic[0].replace(/\]\>|\[|\]|CDATA|\<\!/gi, '');
      leads = leads[0].replace(/\]\>|\[|\]|CDATA|\<\!/gi, '');
      content = content[0].replace(/\]\>|\[|\]|CDATA|\<\!/gi, '');
      const htmlReg = /<script(([\s\S])*?)\<\/script>|<[^>]*>/gi;
      const imgReg = /\<img(.*?)\>/gi;
      const imgsOri = content.match(imgReg) || [];
      const imgs = imgsOri.map((el, i) => {
        let name = el.match(/alt\=\"(.*?)\"/gi) || '';
        let src = el.match(/src\=\"(.*?)\"/gi) || '';
        name = name[0] ? name[0].split('=')[1].replace(/\"|\'/gi, '') : ('image' + i);
        src = (src[0] || '').split('=')[1].replace(/\"|\'/gi, '');
        return `[${name}](${src})`;
      });
      imgsOri.forEach((el, i) => {
        content = content.replace(el, imgs[i] || '');
      });
      topic = topic.replace(htmlReg, '');
      leads = leads.replace(htmlReg, '');
      content = content.replace(htmlReg, '\n');
    }
    const data = ctx.helper.pageAssign({
      topic, leads, content
    });
    ctx.helper.log('CCTV news PAGE DONE', topic, data.hash);
    return {
      data,
    };
  }
}
module.exports = CctvService;