const { Intent, Cache } = require('./index');

Intent.Pull('a1', res => {
  console.log('res1', res, typeof res);
});
setTimeout(() => {
  const c = Intent.Commit('a1', true);
}, 2000)
Intent.Pull('a1', res => {
  console.log('res2', res, typeof res);
});


// Cache.getCache('cookie');