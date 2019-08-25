const { Intent, Cache } = require('./index');

const a = Intent.Commit('a', {
  a: 3
});
console.log(a)
const aFn = Intent.Pull('a.a');
console.log(aFn)

Intent.Commit('a1', 2);
setTimeout(() => {
  const a1 = Intent.Pull('a1');
  console.log(a1);
})


// Cache.getCache('cookie');