'use strict'
export const Data = {
  selectedSong: 0,
  songs: [],
};

export const Store = {
  events: {},
  onceEvents: {},
  on: function (k, fn) {
    if (this.events[k] === undefined) { this.events[k] = []; }
    this.events[k].push(fn);
  },
  once: function (k, fn) {
    if (this.onceEvents[k] === undefined) { this.onceEvents[k] = []; }
    this.onceEvents[k].push(fn);
  },
  clear: function (k) {
    this.events[k] = [];
  },
  emit: function (k, ...args) {
    if (!k) { return; }
    if (!args || args.length <= 0) {
      args = [];
    }
    if (this.events[k] !== undefined && this.events[k].length > 0) {
      this.events[k].forEach(e => {
        e.apply(null, args);
      });
    }
    if (this.onceEvents[k] !== undefined && this.onceEvents[k].length > 0) {
      this.onceEvents[k].forEach(e => {
        e.apply(null, args);
      });
      this.onceEvents[k] = undefined;
    }
  }
};