'use strict';

const Service = require('egg').Service;

class dbService extends Service {
  async find(alians = [
    `id`, `url`, `topic`, `digest`, `thumb`, `keywords`, `time`
  ], where = {}, limit = 10, tbName = 'url_pool') {
    const { app } = this;
    let sql = 'SELECT ' + alians.map(el => '`' + el + '`').join(',') + ' FROM `' + tbName + '`';
    if (where && Object.keys(where).length > 0) {
      const queryStr = Object.keys(where).map(k => '`' + k + '` = ' + (typeof where[k] !== 'number' ? '"' + where[k] + '"' : where[k])).join(' AND ');
      sql += ' WHERE ' + queryStr;
    } else {
      sql += ' WHERE `state` = 0';
    }
    sql += ' LIMIT ' + limit;
    const result = await app.mysql.query(sql);
    return { data: result };
  }

  async insert(values = {}, tbName = 'url_pool') {
    const { app } = this;
    if (values && Object.keys(values).length > 0) {
      values = Object.assign(values, {
        createTime: Math.floor(new Date().getTime() / 1000)
      });
      const sql = 'INSERT INTO `' + tbName + '` ( ' + Object.keys(values).map(el => el).join(' , ') + ' ) VALUES( ' + Object.values(values).map(el => (typeof el !== 'number' ? '"' + el.replace(/\"/g, '\'') + '"' : el)).join(' , ') + ' )';
      const result = await app.mysql.query(sql);
      if (result.affectedRows && result.affectedRows >= 1) {
        return { data: true };
      }
    }
    return { data: false };
    // return { data: true };
  }
  async insertArray(valueArr = [], tbName = 'url_pool') {
    const { app } = this;
    const keyArr = Object.keys(valueArr[0]);
    let sql = 'INSERT INTO `' + tbName + '` ( ';
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

  async update(values = {}, where = {}, tbName = 'url_pool') {
    const { app } = this;
    if (values && Object.keys(values).length > 0) {
      let sql = 'UPDATE `' + tbName + '` SET ' + Object.keys(values).map(k => '`' + k + '` = ' + (typeof values[k] !== 'number' ? '"' + values[k] + '"' : values[k])).join(' , ');
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
module.exports = dbService;
