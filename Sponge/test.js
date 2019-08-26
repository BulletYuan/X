const { Intent, Cache } = require('./index');

Intent.Pull('a1', res => {
  console.log('res', res);
}, err => {
  console.error('err', err);
}, () => {
  console.log('done');
});
setTimeout(() => {
  const c = Intent.Commit('a1', '12343');
}, 2000)


// Cache.getCache('cookie');