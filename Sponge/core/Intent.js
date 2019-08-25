let Storage;
if (typeof require !== 'undefined') {
  Storage = require('./Storage').Storage;
}

function ObjectStringify(obj, append = {}) {
  const _ts = Object.prototype.toString.call(obj);
  const _apds = Object.keys(append);
  if (_apds.length > 0) {
    for (let i = 0; i < _apds.length; i++) {
      const ft = _apds[i];
      if (_ts.indexOf(ft) > 0) {
        const res = append[ft].call(this, obj);
        if (typeof res !== 'string') {
          if (res.toString) {
            return res.toString();
          } else {
            return Object.prototype.toString.call(res);
          }
        }
        return res;
      }
    }
  }
  if (_ts.indexOf('Function') > 0) {
    return obj.toString();
  } else if (_ts.indexOf('Object') > 0) {
    let kv = '';
    const v = Object.keys(obj);
    for (let i = 0; i < v.length; i++) {
      const el = v[i]
      kv += el + ':' + ObjectStringify(obj[el]) + ',';
    }
    return '{' + kv.substr(0, kv.length - 1) + '}';
  } else if (_ts.indexOf('Array') > 0) {
    let v = '';
    for (let i = 0; i < v.length; v++) {
      const el = v[i]
      v += ObjectStringify(el) + ',';
    }
    return '[' + v.substr(0, v.length - 1) + ']';
  } else if (_ts.indexOf('Null') > 0) {
    return 'null';
  } else if (_ts.indexOf('Undefined') > 0) {
    return 'undefined';
  } else {
    return obj.toString();
  }
}

const Commit = function (key, state) {
  if (!Storage) {
    return null;
  }

  try {
    eval('Storage.' + key + '=' + ObjectStringify(state));
  } catch (e) {
    return null;
  }
  return Storage;
};

const Pull = function (key) {
  if (!Storage) {
    return null;
  }
  try {
    return eval('Storage.' + key + '.call(null)');
  } catch (e) {
    return null; 
  }
}

if (typeof module !== 'undefined') {
  module.exports = {
    Commit,
    Pull,
  };
}