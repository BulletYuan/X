'use strict'

const bulletEvents = {
  _list: {},
  _listO: {},
  on: function (_k, _fk, _f) {
    if (!this._list[_k] || this._list[_k] === undefined) {
      this._list[_k] = {};
    }
    this._list[_k][_fk] = _f;
  },
  once: function (_k, _fk, _f) {
    if (!this._listO[_k] || this._listO[_k] === undefined) {
      this._listO[_k] = {};
    }
    this._listO[_k][_fk] = _f;
  },
  rename: function (_k, _nk) {
    if (this._list[_k] && this._list[_k] !== undefined) {
      this._list[_nk] = Object.assign({}, this._list[_k]);
      delete this._list[_k];
    }
    if (this._listO[_k] && this._listO[_k] !== undefined) {
      this._listO[_nk] = Object.assign({}, this._listO[_k]);
      delete this._listO[_k];
    }
  },
  clearAll: function () {
    this._list = {};
    this._listO = {};
  },
  clear: function (_k) {
    delete this._list[_k];
    delete this._listO[_k];
  },
  emit: function (_k, _fk, _ctx, ...args) {
    if (this._list[_k] && this._list[_k] !== undefined && Object.keys(this._list[_k]).length > 0) {
      this._list[_k][_fk] && this._list[_k][_fk].apply(_ctx, args);
    }
    if (this._listO[_k] && this._listO[_k] !== undefined && Object.keys(this._listO[_k]).length > 0) {
      this._listO[_k][_fk] && this._listO[_k][_fk].apply(_ctx, args);
      delete this._listO[_k];
    }
  }
};

export default bulletEvents;