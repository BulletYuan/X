'use strict';

const Service = require('egg').Service;

class UrlPoolService extends Service {
  async find(where = {}) {
    const { app } = this;
    let sql = 'SELECT `id`,`url`,`topic`,`digest`,`thumb`,`keywords`,`time` FROM `url_pool`';
    if (where && Object.keys(where).length > 0) {
      const queryStr = Object.keys(where).map(k => '`' + k + '` = ' + (typeof where[k] !== 'number' ? '"' + where[k] + '"' : where[k])).join(' AND ');
      sql += ' WHERE ' + queryStr;
    } else {
      sql += ' WHERE `state` = 0';
    }
    const result = await app.mysql.query(sql);
    return { data: result };
  }

  async insert(values = {}) {
    const { app } = this;
    if (values && Object.keys(values).length > 0) {
      const sql = 'INSERT INTO `url_pool` ( ' + Object.keys(values).map(el => el).join(' , ') + ' ) VALUES( ' + Object.values(values).map(el => (typeof el !== 'number' ? '"' + el.replace(/\"/g, '\'') + '"' : el)).join(' , ') + ' )';
      const result = await app.mysql.query(sql);
      if (result.affectedRows && result.affectedRows >= 1) {
        return { data: true };
      }
    }
    return { data: false };
    // return { data: true };
  }
  async insertArray(valueArr = []) {
    const { app } = this;
    const keyArr = Object.keys(valueArr[0]);
    let sql = 'INSERT INTO `url_pool` ( ';
    sql += keyArr.map(el => '"' + el + '"').join(' , ');
    sql += ' ) VALUES ?';
    const values = [];
    for (let i = 0; i < valueArr.length; i++) {
      values.push(Object.values(values));
    }
    const result = await app.mysql.query(sql, values);
    if (result.affectedRows && result.affectedRows >= 1) {
      return { data: true };
    }
    return { data: false };
  }

  async update(values = {}, where = {}) {
    const { app } = this;
    if (values && Object.keys(values).length > 0) {
      let sql = 'UPDATE `url_pool` SET ' + Object.keys(values).map(k => '`' + k + '` = ' + (typeof values[k] !== 'number' ? '"' + values[k] + '"' : values[k])).join(' , ');
      if (where && Object.keys(where).length > 0) {
        const queryStr = Object.keys(where).map(k => '`' + k + '` = ' + (typeof where[k] !== 'number' ? '"' + where[k] + '"' : where[k])).join(' AND ');
        sql += ' WHERE ' + queryStr;
      }
      const result = await app.mysql.query(sql);
      if (result.affectedRows && result.affectedRows >= 1) {
        return { data: true };
      }
    }
    return { data: false };
  }
}
module.exports = UrlPoolService;
