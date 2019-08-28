const { Intent, Cache } = require('./index');

Intent.Commit('a1', false);
Intent.Pull('a1', res => {
  console.log('res1', res);
});
Intent.Commit('a1', true);
setTimeout(() => {
  Intent.Commit('a1', true);
}, 2000)
Intent.Pull('a1', res => {
  console.log('res2', res);
});


// Cache.getCache('cookie');