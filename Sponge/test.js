const { Intent, Cache } = require('./index');

const cmt = Intent.Commit('a', {
    a: function (a) { console.log(a); }
});
const aFn = Intent.Pull('a.a');
aFn && aFn(123);

Cache.getCache('cookie');