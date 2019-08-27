function Sponge() {
  this.Storage = {};
}
Sponge.prototype.ObjectStringify = function (obj, append = {}) {
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
      kv += el + ':' + this.ObjectStringify(obj[el]) + ',';
    }
    return '{' + kv.substr(0, kv.length - 1) + '}';
  } else if (_ts.indexOf('Array') > 0) {
    let v = '';
    for (let i = 0; i < v.length; v++) {
      const el = v[i]
      v += this.ObjectStringify(el) + ',';
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
Sponge.prototype.Commit = function (key, state) {
  try {
    if (typeof this.Storage[key] === 'undefined') {
      return null;
    }
    if (typeof state === 'function') {
      this.Storage[key].forEach(val => {
        val.call(null, this.ObjectStringify(state));
      })
    } else {
      this.Storage[key].forEach(val => {
        val.call(null, state);
      })
    }
  } catch (e) {
    return null;
  }
};
Sponge.prototype.Pull = function (key, done = res => res, error = err => err, complate = () => { }) {

  if (typeof this.Storage[key] === 'undefined') {
    this.Storage[key] = [];
  }
  this.Storage[key].push(state => {
    const _ts = Object.prototype.toString.call(state);
    try {
      if (_ts.indexOf('Function') > 0) {
        done(state());
      } else {
        done(state);
      }
    } catch (e) {
      error(e);
    }
    complate();
  });

};
const sponge = new Sponge();

if (typeof module !== 'undefined') {
  module.exports = sponge;
}