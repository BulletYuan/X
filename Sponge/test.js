const { Intent, Cache } = require('./index');

Intent.Pull('a1', res => {
  console.log('res1', res);
});
setTimeout(() => {
  const c = Intent.Commit('a1', '12343');
}, 2000)
Intent.Pull('a1', res => {
  console.log('res2', res);
});


// Cache.getCache('cookie');