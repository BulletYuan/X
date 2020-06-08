let Intent, Cache;
if (typeof require !== 'undefined') {
  Intent = require('./core/Intent');
  // Cache = require('./core/Cache');
}

if (typeof module !== 'undefined') {
  module.exports = {
    Intent
  };
  // module.exports = {
  //   Intent,
  //   Cache,
  // };
}