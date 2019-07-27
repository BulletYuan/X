'use strict'

const BulletEvents = (function () {
  let _list = { _proto_OnceEvents: {} };
  const _constructor = function () { };
  _constructor.prototype.on = function (_k, _fk, _f, ..._isO) {
    if (_isO.length > 0 && _isO[0] === true) {
      if (!_list['_proto_OnceEvents'][_k]) {
        _list['_proto_OnceEvents'][_k] = {};
      }
      _list['_proto_OnceEvents'][_k][_fk] = _f;
    } else {
      if (!_list[_k]) {
        _list[_k] = {};
      }
      _list[_k][_fk] = _f;
    }
  };
  _constructor.prototype.clear = function (..._k) {
    if (_k.length > 0) {
      if (_list[_k[0]][_k[1]]) { delete _list[_k[0]][_k[1]]; }
      if (_list['_proto_OnceEvents'][_k[0]][_k[1]]) { delete _list['_proto_OnceEvents'][_k[0]][_k[1]]; }
      if (_k.length === 1) {
        if (_list[_k[0]]) { delete _list[_k[0]]; }
        if (_list['_proto_OnceEvents'][_k[0]]) { delete _list['_proto_OnceEvents'][_k[0]]; }
      }
    } else {
      _list = { _proto_OnceEvents: {} };
    }
  };
  _constructor.prototype.emit = function (_k, _fk, ...args) {
    if (_list[_k] && _list[_k][_fk]) {
      _list[_k][_fk].apply(null, ...args);
    }
    if (_list['_proto_OnceEvents'][_k] && _list['_proto_OnceEvents'][_k][_fk]) {
      _list['_proto_OnceEvents'][_k][_fk].apply(null, ...args);
      delete _list['_proto_OnceEvents'][_k][_fk];
    }
  };
  _constructor.prototype.rename = function (..._k) {
    if (_k.length === 2) {
      _renameKey(_k[0], _k[1]);
    }
    if (_k.length === 3) {
      _renameKey(_k[0], _k[2]);
    }
    if (_k.length > 3) {
      _renameKey(_k[0], _k[1], _k[2], _k[3]);
    }
    function _renameKey(_k, _nk, _fk, _nfk) {
      if (!_fk || !_nfk) {
        if (_list[_k][_fk]) {
          _list[_nk][_nfk] = _list[_k][_fk];
          delete _list[_k][_fk];
        }
        if (_list['_proto_OnceEvents'][_k][_fk]) {
          _list['_proto_OnceEvents'][_nk][_nfk] = Object.assign({}, _list['_proto_OnceEvents'][_k][_fk]);
          delete _list['_proto_OnceEvents'][_k][_fk];
        }
      }
      if (_list[_k]) {
        _list[_nk] = Object.assign({}, _list[_k]);
        delete _list[_k];
      }
      if (_list['_proto_OnceEvents'][_k]) {
        _list['_proto_OnceEvents'][_nk] = Object.assign({}, _list['_proto_OnceEvents'][_k]);
        delete _list['_proto_OnceEvents'][_k];
      }
    }
  };
  return _constructor;
})();

export default new BulletEvents();