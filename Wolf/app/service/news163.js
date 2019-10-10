'use strict';

const Service = require('egg').Service;

class News163Service extends Service {
  async getIP(url) {
    if (!url) { return { data: {} }; }
    const { ctx } = this;
    const result = await ctx.curl('http://' + url, {
      method: 'GET',
      gzip: true,
      dataType: 'text',
    });
    console.log(result);
  }

  async rank() {
    const { ctx } = this;
    const result = await ctx.curl('http://news.163.com/rank/', {
      method: 'GET',
      gzip: true,
      dataType: 'text',
    });
    const content = result.data;
    const gray = content.match(/\<td class\=\"gray\"(.*?)\<\/td\>/gi);
    const red = content.match(/\<td class\=\"red\"(.*?)\<\/td\>/gi);
    const counts = content.match(/\<td class\=\"cBlue\"(.*?)\<\/td\>/gi);
    const amount = counts.length;
    const data = [];
    for (let i = 0; i < amount / 10; i++) {
      for (let j = 0; j < 10; j++) {
        const item = j < 3 ? red[3 * i + j] : gray[7 * i + (j - 3)];
        const no = Number(item.match(/\<span\>(.*)\<\/span\>/gi)[0].replace(/span\>/g, '').replace(/\</g, '').replace('\/', ''));
        const _con = item.match(/href\=\"(.*?)\<\/a/gi)[0].replace(/\'/g, '\"');
        const url = _con.match(/\"(.*?)\"/gi)[0].replace(/\"/g, '');
        const topic = _con.match(/\>(.*?)\</gi)[0].replace(/\>/g, '').replace(/\</g, '');
        let watch = counts[j];
        watch = watch.match(/\>(.*?)\</gi)[0].replace(/\>/g, '').replace(/\</g, '');
        data.push({
          no, url, topic, watch,
        });
      }
    }
    return {
      data,
    };
  }
  async world() {
    const { ctx } = this;
    const result = await ctx.curl('https://temp.163.com/special/00804KVA/cm_guoji.js?callback=data_callback', {
      method: 'GET',
      gzip: true,
      headers: {
        'Accept-Language': 'zh-CN,zh;q=0.9',
      },
      dataType: 'text',
    });
    const content = result.data;
    let list = content.substring(14, content.length - 1);
    list = JSON.parse(list);
    const data = [];
    for (let i = 0; i < list.length; i++) {
      const el = list[i];
      const url = el['docurl'] || '';
      const topic = (el['title'] || '');
      const time = Math.floor(new Date(el['time'] || 0).getTime() / 1000);
      const thumb = el['imgurl'] || '';
      data.push({
        url, topic, time, thumb,
      });
    }
    return {
      data,
    };
  }
  async domestic() {
    const { ctx } = this;
    const result = await ctx.curl('https://temp.163.com/special/00804KVA/cm_guonei.js?callback=data_callback', {
      method: 'GET',
      gzip: true,
      dataType: 'text',
    });
    const content = result.data;
    let list = content.substring(14, content.length - 1);
    list = JSON.parse(list);
    const data = [];
    for (let i = 0; i < list.length; i++) {
      const el = list[i];
      const url = el['docurl'] || '';
      const topic = ((el['title'] || ''));
      const time = Math.floor(new Date(el['time'] || 0).getTime() / 1000);
      const thumb = el['imgurl'] || '';
      data.push({
        url, topic, time, thumb,
      });
    }
    return {
      data,
    };
  }
  async newest() {
    const { ctx } = this;
    const result = await ctx.curl('http://news.163.com/world/', {
      method: 'GET',
      gzip: true,
      dataType: 'text',
    });
    const content = result.data;
    const list = content.match(/\<a href\=(.*?)\<\/a\>/gi);
    const year = new Date().getFullYear() - 2000;
    const data = [];
    for (let i = 0; i < list.length; i++) {
      const el = list[i];
      if (el.indexOf('news.') > 0 && el.indexOf('/' + year + '/') > 0 && el.indexOf('.html') > 0) {
        const url = el.match(/href\=\"(.*?)\"/gi)[0].replace(/\"/g, '').split('=')[1];
        const topic = el.match(/\>(.*?)\</gi)[0].replace(/\<|\>/g, '');
        data.push({
          url, topic,
        });
      }
    }
    return {
      data,
    };
  }
}

module.exports = News163Service;
