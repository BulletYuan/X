let Storage;
if (typeof require !== 'undefined') {
  Storage = require('./Storage');
}

const Commit = function (key, state) {
  if (!Storage) {
    return null;
  }
  try {
    eval('Storage.' + key + '=' + state);
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
    return eval('Storage.' + key);
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