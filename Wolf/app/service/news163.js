'use strict';

const Service = require('egg').Service;
const Iconv = require('iconv-lite');
const urls = require('../common/urls');

class News163Service extends Service {
  async ranks() {
    const { ctx } = this;
    ctx.helper.log('ranks', urls.news163.ranks);
    const result = await ctx.helper.curl(urls.news163.ranks, {
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
        // const no = Number(item.match(/\<span\>(.*)\<\/span\>/gi)[0].replace(/span\>/g, '').replace(/\</g, '').replace('\/', ''));
        const _con = item.match(/href\=\"(.*?)\<\/a/gi)[0].replace(/\'/g, '\"');
        const url = _con.match(/\"(.*?)\"/gi)[0].replace(/\"/g, '');
        const topic = _con.match(/\>(.*?)\</gi)[0].replace(/\>/g, '').replace(/\</g, '');
        // let watch = counts[j];
        // watch = watch.match(/\>(.*?)\</gi)[0].replace(/\>/g, '').replace(/\</g, '');
        data.push(ctx.helper.dataAssign({
          // no,
          // watch,
          url, topic,
        }));
      }
    }
    return {
      data,
    };
  }

  async requestApi(kw = '', type = 'guonei') {
    const { ctx } = this;
    const url = urls.news163.requestApi + type + '.js?callback=' + kw;
    ctx.helper.log(kw, type, url);
    const result = await ctx.helper.curl(url, {
      method: 'GET',
      gzip: true,
      headers: {
        'accept-charset': 'utf-8',
      }
    });
    let content = result.data;
    content = Iconv.decode(new Buffer(content), 'gbk');
    content = content.toString();
    let listOri = content.substring(kw.length + 1, content.length - 1);
    let list = {};
    try {
      list = JSON.parse(listOri);
    } catch (e) {
      ctx.helper.error('News163Service requestApi Error: ' + e);
      new Error('News163Service requestApi Error: ' + e + '\n');
    }
    const data = [];
    if (list && list.length > 0) {
      for (let i = 0; i < list.length; i++) {
        const el = list[i];
        const url = el.docurl || '';
        const topic = (el.title || '');
        const time = Math.floor(new Date(el.time || 0).getTime() / 1000);
        const thumb = el.imgurl || '';
        const keywords = el.keywords ? el.keywords.map(el => el.keyname).join(' ') : '';
        data.push(ctx.helper.dataAssign({
          url, topic, time, thumb,
          keywords,
        }));
      }
    }
    return {
      data,
    };
  }
  async world() {
    const { data } = await this.requestApi('data_callback', 'guoji');
    return {
      data,
    };
  }
  async domestic() {
    const { data } = await this.requestApi('data_callback');
    return {
      data,
    };
  }

  async newest() {
    const { ctx } = this;
    ctx.helper.log('newest', urls.news163.newest);
    const result = await ctx.helper.curl(urls.news163.newest, {
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
    let topic = page.match(/\<h1(([\s\S])*?)\<\/h1\>/gi) || [];
    let content = page.match(/\<div class\=\"post\_text\" id\=\"endText\"(([\s\S])*?)\<\/div\>/gi) || [];
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

module.exports = News163Service;
