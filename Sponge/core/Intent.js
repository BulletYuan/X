let Storage;
if (typeof require !== 'undefined') {
  Storage = require('./Storage');
}

// const center=

if (typeof module !== 'undefined') {
  module.export = {
    Storage,
  }
}