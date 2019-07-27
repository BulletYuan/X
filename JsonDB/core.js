
const fs = require('fs');

const JSONDataBase = (function () {
  const select_query = {
    where: {},
    limit: 50,
    offset: 0,
    sortKey: '',
    order: 'desc',
  };
  const insert_query = {
    datas: [],
  };
  const update_query = {
    where: {},
    data: {},
    limit: 1,
  };
  const delete_query = {
    where: {},
    keys: [],
  };

  const _db_cfg = {
    name: '',
    role: {
      write: 4,
      read: 4,
      change: 4,
    },
    auth: [],
  };
  const _cfg = {
    role: {
      write: 4,
      read: 4,
      change: 4,
    },
    auth: [],
    history: {
      created: 0,
      lastest: 0,
      actions: [],
    }
  };
  const _action = {
    type: 0, // [0 create|1 change|2 read|3 delete]
    db: '',
    tb: '',
    row: -1,
    _value: {},
    _timestamp: 0,
  };

  const utils = {
    // 传入数组，排序属性，排序方式
    sortFn: (_arr, _sk, _o) => {
      return _arr.sort((a, b) => {
        if (!a || !b || !a[_sk] || !b[_sk]) return -1;
        if (a[_sk] > b[_sk]) return _o === 'asc' ? 1 : -1;
        else if (a[_sk] === b[_sk]) return 0;
        else return _o === 'asc' ? -1 : 1;
      });
    },
    queryCompare: (_item = {}, _where, _abs = false) => {
      let _mark = true;
      if (_abs) {
        _mark = true;
        if (typeof _where !== 'object') {
          return false;
        }
        for (let x = 0; x < Object.keys(_where).length; x++) {
          if (_item && _item[Object.keys(_where)[x]] === _where[Object.keys(_where)[x]]) {
            _mark = true;
          } else {
            _mark = false;
            break;
          }
        }
      } else {
        if (typeof _where !== 'object') {
          if (JSON.stringify(_item).indexOf(_where.toString()) < 0) {
            _mark = false;
          } else {
            _mark = true;
          }
        } else {
          for (let i = 0; i < Object.keys(_where).length; i++) {
            let _q = {};
            _q[Object.keys(_where)[i]] = _where[Object.keys(_where)[i]];
            _q = JSON.stringify(_q);
            _q = _q.substring(1, _q.length - 1);
            if (JSON.stringify(_item).indexOf(_q) < 0) {
              _mark = false;
              break;
            } else {
              _mark = true;
            }
          }
        }
      }
      return _mark;
    },
    file: {
      read: (path) => {
        try {
          const content = fs.readFileSync(path, {
            encoding: 'utf8',
            flag: 'r',
          });
          return JSON.parse(content);
        } catch (e) {
          throw e;
        }
      },
      write: (path, content) => {
        try {
          fs.writeFileSync(path, JSON.stringify(content), {
            encoding: 'utf8',
            flag: 'w',
          });
          console.log('file existed:' + path);
          return true;
        } catch (e) {
          throw e;
        }
      },
      remove: (path) => {
        try {
          fs.unlinkSync(path);
          console.log('file deleted:' + path);
          return true;
        } catch (e) {
          throw e;
        }
      },
    },
    history: {
      _actionFn: (_t, _db, _tb, _row, _val) => {
        const _a = Object.assign({}, _action);
        _a.type = _t;
        _a.db = _db;
        _a.tb = _tb;
        _a.row = _row;
        _a._value = _val;
        _a._timestamp = new Date().getTime();
        return _a;
      },

      create: (_db = '', _tb = '', _row = -1, _val = {}) => {
        return utils.history._actionFn(0, _db, _tb, _row, _val);
      },
      change: (_db = '', _tb = '', _row = -1, _val = {}) => {
        return utils.history._actionFn(1, _db, _tb, _row, _val);
      },
      read: (_db = '', _tb = '', _row = -1, _val = {}) => {
        return utils.history._actionFn(2, _db, _tb, _row, _val);
      },
      delete: (_db = '', _tb = '', _row = -1, _val = {}) => {
        return utils.history._actionFn(3, _db, _tb, _row, _val);
      },

      report: (_db, _type, _conn, _row = -1, _val = {}) => {
        const _res = Object.assign({}, _db);
        if (!_res || !_res._cfg || !_res._cfg.history) {
          return _res;
        }
        _res._cfg.history.actions.push(utils.history[_type](_conn.db, _conn.tb, _row, _val));
        _res._cfg.history.lastest = new Date().getTime();
        return _res;
      },
    },
  };

  const BulletJDB = function (conn = {}) {
    this.connection = {
      protocol: 'http',
      host: '',
      path: '',
      port: '',
      user: '',
      pwd: '',
      db: '',
      tb: '',
    }
    this.connection = Object.assign(this.connection, conn);
    this.state = 0; // 0 unconnect | 1 connected | 2 error | 3 timeout
    this.path = '';
    return this;
  };
  BulletJDB.prototype.connect = function (conn) {
    this.close();
    this.connection = Object.assign(this.connection, conn);

    if (this.connection.path && this.connection.db) {
      this.path = this.connection.path + '/' + this.connection.db + '.db.json';
      this.state = 1;
      return true;
    }
    return false;
  };
  BulletJDB.prototype.close = function () {
    this.connection = {
      protocol: 'http',
      host: '',
      path: '',
      port: '',
      user: '',
      pwd: '',
      db: '',
      tb: '',
    }
    this.path = '';
    this.state = 0;
    return true;
  };

  BulletJDB.prototype.createDB = function (db_cfg) {
    db_cfg = Object.assign(_db_cfg, db_cfg);
    const _db = {
      _cfg,
    };
    _db._cfg.role = Object.assign(db_cfg.role, _db._cfg.role);
    _db._cfg.auth = Object.assign(db_cfg.auth, _db._cfg.auth);
    _db._cfg.history.created = new Date().getTime();
    try {
      utils.history.report(_db, 'create', { db: db_cfg.name });
      utils.file.write(this.connection.path + '/' + db_cfg.name + '.db.json', _db);
      return true;
    } catch (e) {
      throw e;
    }
  };
  BulletJDB.prototype.deleteDB = function (db_name) {
    utils.file.remove(this.connection.path + '/' + db_name + 'db.json');
  };

  BulletJDB.prototype.createTB = function (tb_name) {
    if (this.state === 1) {
      const _self = this;
      let _data = utils.file.read(this.path);
      _data[tb_name] = Array(0);
      try {
        _data = utils.history.report(_data, 'create', { db: _self.connection.db, tb: tb_name });
        utils.file.write(_self.path, _data);
        return true;
      } catch (e) {
        throw e;
      }
    } else {
      throw new Error('current state is: ' + this.state);
    }
  };
  BulletJDB.prototype.deleteTB = function (tb_name) {
    if (this.state === 1) {
      const _self = this;
      let _data = utils.file.read(this.path);
      delete _data[tb_name];
      try {
        _data = utils.history.report(_data, 'delete', { db: _self.connection.db, tb: tb_name });
        utils.file.write(_self.path, _data);
        return true;
      } catch (e) {
        throw e;
      }
    } else {
      throw new Error('current state is: ' + this.state);
    }
  };

  BulletJDB.prototype.select = function (query) {
    if (this.state === 1) {
      query = Object.assign({}, select_query, query);
      const _tmp = [], _wk = Object.keys(query.where), _self = this;
      let _data = utils.file.read(this.path), _res = [];
      // where filter
      for (let i = 0; i < _data[this.connection.tb].length; i++) {
        const _item = _data[_self.connection.tb][i];

        if (_wk.length > 0) {
          // compare where attr value
          if (utils.queryCompare(_item, query.where)) {
            _tmp.push(_item);

            // history report
            _data = utils.history.report(_data, 'read', { db: _self.connection.db, tb: _self.connection.tb }, i);
            utils.file.write(_self.path, _data);
          }
        } else {
          _tmp.push(_item);
        }
      }

      // array sort
      _res = utils.sortFn(_tmp, query.sortKey, query.order);

      // slice array
      _res = _res.slice(query.offset, query.offset + (_res.length <= query.limit ? _res.length : query.limit));

      return _res;
    } else {
      throw new Error('current state is: ' + this.state);
    }
  };
  BulletJDB.prototype.insert = function (query) {
    if (this.state === 1) {
      query = Object.assign({}, insert_query, query);
      const _self = this;
      let _data = utils.file.read(this.path);
      for (let i = 0; i < query.datas.length; i++) {
        ((i) => {
          _data[_self.connection.tb].push(query.datas[i]);

          // history report
          _data = utils.history.report(_data, 'create', { db: _self.connection.db, tb: _self.connection.tb }, _data[_self.connection.tb].length - 1, query.datas[i]);
          utils.file.write(_self.path, _data);
        })(i);
      }
      return true;
    } else {
      throw new Error('current state is: ' + this.state);
    }
  };
  BulletJDB.prototype.update = function (query) {
    if (this.state === 1) {
      query = Object.assign({}, update_query, query);
      const _tmp = [], _d = Object.keys(query.data), _self = this;
      let _data = utils.file.read(this.path);
      // where filter
      for (let i = 0; i < _data[this.connection.tb].length; i++) {
        const _item = _data[_self.connection.tb][i];
        // change values
        if (utils.queryCompare(_item, query.where, true)) {
          for (let j = 0; j < _d.length; j++) {
            _data[_self.connection.tb][i][_d[j]] = query.data[_d[j]];
            const a = {};
            a[_d[j]] = query.data[_d[j]];

            // history report
            _data = utils.history.report(_data, 'change', { db: _self.connection.db, tb: _self.connection.tb }, i, a);
            utils.file.write(_self.path, _data);
          }
          _tmp.push(_data[_self.connection.tb][i]);
        }
      }

      return _tmp;
    } else {
      throw new Error('current state is: ' + this.state);
    }
  };
  BulletJDB.prototype.delete = function (query) {
    if (this.state === 1) {
      query = Object.assign({}, delete_query, query);
      const _d = query.keys, _self = this;
      let _data = utils.file.read(this.path);
      // where filter
      for (let i = 0; i < _data[this.connection.tb].length; i++) {
        const _item = _data[_self.connection.tb][i];
        // change values
        if (utils.queryCompare(_item, query.where, true)) {
          _data[this.connection.tb][i]
          for (let j = 0; j < _d.length - 1; j++) {
            delete _data[_self.connection.tb][i][_d[j]];
            const a = {};
            a[_d[j]] = _data[_self.connection.tb][i][_d[j]];

            // history report
            _data = utils.history.report(_data, 'delete', { db: _self.connection.db, tb: _self.connection.tb }, i, a);
            utils.file.write(_self.path, _data);
          }
        }
      }

      return true;
    } else {
      throw new Error('current state is: ' + this.state);
    }
  };

  return BulletJDB;
})();

module.exports = JSONDataBase;