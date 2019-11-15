'use strict';

// const puppeteer = require('puppeteer');
const crypto = require('crypto');
const fs = require('fs');

module.exports = {
  devLog: true,
  async noting(title = 'default logging', content) {
    const logsDir = __dirname + '/../../logs';
    const logsFile = 'grab_url_logs';
    if (!fs.existsSync(logsDir)) {
      fs.mkdirSync(logsDir);
    }
    if (!fs.existsSync(logsDir + '/' + logsFile)) {
      fs.writeFileSync(logsDir + '/' + logsFile, '===== Create Log File at ' + new Date().toLocaleString() + ' ===== \n \n', {
        encoding: 'utf8',
        flag: 'a',
      });
    }
    fs.writeFileSync(logsDir + '/' + logsFile, '===== Logging ' + title + ' at ' + new Date().toLocaleString() + ' ===== \n' + content + '\n', {
      encoding: 'utf8',
      flag: 'a',
    });
  },
  async log(...msg) {
    if (this.devLog) {
      console.log(...msg);
    }
    const title = msg.splice(0, 1);
    this.noting(title, msg.join('\n'));
  },
  async error(...msg) {
    console.log(msg.length)
    if (this.devLog) {
      console.error(...msg);
    }
    // this.noting('ERROR LOGGING', msg.join('\n'));
  },
  async queue(datas, handlerSimple = function (data) { }, limit = 3) {
    const taskPrms = datas.map(el => {
      return new Promise(async (res, rej) => {
        const handlerReturn = await handlerSimple(el);
        res(handlerReturn || false);
      });
    });
    const results = await Promise.all(taskPrms);
    return {
      successed: results.length,
      failed: taskPrms.length - results.length,
    };
  },
  dataAssign(data) {
    if (typeof data.time !== 'number') {
      data.time = Number(data.time);
    }
    if (isNaN(data.time)) {
      data.time = 0;
    }
    return Object.assign(
      { url: '', topic: '', digest: '', thumb: '', keywords: '', time: 0 },
      data);
  },
  pageAssign(data) {
    let hash = this.crypto('', 'sha256');
    if (data && !data['hash']) {
      hash = this.crypto((data['content'] || ''), 'sha256');
      data['hash'] = hash;
    }
    return Object.assign(
      { topic: '', leads: '', content: '' },
      data);
  },
  response(status = 200, headers = {}, body = []) {
    status = Number(status) || 200;
    headers = Object.keys(headers).length > 0 ? headers : {
      'Content-Type': 'application/json; charset=utf-8',
    };
    body = body || [];
    return {
      status, headers, body,
    };
  },
  responseData(data, msg = 'success') {
    const result = {
      state: 0,
      data,
      msg,
    };
    return result;
  },

  ioFormat(action, errMsg = null) {
    let metadata;
    if (errMsg == null) {
      metadata = {
        state: 1,
        msg: '',
      };
    } else {
      metadata = {
        state: 0,
        msg: errMsg,
      };
    }
    const meta = Object.assign({}, {
      timestamp: Date.now(),
    }, metadata);

    return {
      meta,
      data: {
        action,
      },
    };
  },

  async curl(url, option = {
    method: 'GET',
    gzip: true,
    dataType: 'text',
  }) {
    const { ctx } = this;
    try {
      return await ctx.curl(url, option);
    } catch (e) {
      this.error('HTTP Requesting ' + url + ' Error : \n' + e.toString());
    }
    return { data: '' };
  },
  crypto(data = '', type = 'md5') {
    const hsh = crypto.createHash(type);
    hsh.update(data);
    return hsh.digest('hex');
  },

  // Browser: null,
  // async getBrowser() {
  //   if (!this.Browser) {
  //     this.Browser = await puppeteer.launch();
  //   }
  //   return this.Browser;
  // },
  // async closeBrowser() {
  //   if (this.Browser) {
  //     await this.Browser.close();
  //     this.Browser = null;
  //   }
  // },
  // async getPage(url) {
  //   const page = await this.Browser.newPage();
  //   await page.goto(url);
  //   return page;
  // },
  // async closePage(page) {
  //   if (page && page instanceof puppeteer.Page) {
  //     await page.close();
  //   }
  // },
  // async closeAllPages() {
  //   if (this.Browser) {
  //     const pages = await this.Browser.pages();
  //     pages.forEach(async page => {
  //       await page.close();
  //     });
  //   }
  // },
};
