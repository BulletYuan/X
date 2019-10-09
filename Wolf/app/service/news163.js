'use strict';

const Service = require('egg').Service;

class News163Service extends Service {
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
}

module.exports = News163Service;
