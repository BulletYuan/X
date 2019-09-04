const { Intent, Cache } = require('./index');

Intent.Commit('a1', false);
Intent.Pull('a1', res => {
  console.log('a1', res);
});
Intent.Pull('a2', res => {
  console.log('a2', res);
});
Intent.Pull('a3', res => {
  console.log('a3', res);
});
Intent.Pull('a4', res => {
  console.log('a4', res);
});
Intent.Pull('a5', res => {
  console.log('a5', res);
});
setTimeout(() => {
  Intent.Commit(['a2', 'a3', 'a4', 'a5'], [true, false, false, true]);
  Intent.Commit('a1', true);
}, 2000)


// Cache.getCache('cookie');