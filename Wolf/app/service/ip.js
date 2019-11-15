'use strict';

const Service = require('egg').Service;
const urls = require('../common/urls');

class IPService extends Service {
  async ip() {
    const { ctx } = this;
    ctx.helper.log('ip', urls.ip.ip);
    const result = await ctx.helper.curl(urls.ip.ip, {
      method: 'GET',
      dataType: 'text',
    });
    const content = result.data;
    let ip = content.match(/\[(.*?)\]/g)[0];
    let city = content.match(/自\：(.*)/g)[0];
    ip = ip.replace(/\[|\]/g, '');
    city = city.split('：')[1];
    const server = city.split(' ')[1];
    city = city.split(' ')[0];
    ctx.helper.log('IP INFO', ip,
      city,
      server);
    return {
      ip,
      city,
      server,
    };
  }
}
module.exports = IPService;
