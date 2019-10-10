'use strict';

const Service = require('egg').Service;

class IPService extends Service {
  async ip() {
    const { ctx } = this;
    const result = await ctx.curl('http://2000019.ip138.com/', {
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
    return {
      ip,
      city,
      server,
    };
  }
}
module.exports = IPService;
