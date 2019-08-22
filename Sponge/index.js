const Intent = require('./core/Intent');

Intent.Commit('a', 1231);
setTimeout(() => {
  const r3 = Intent.Pull('a');
  console.log(r3);
  Intent.Commit('a', 1111);
});
const r3 = Intent.Pull('a');
console.log(r3);
setTimeout(() => {
  const r3 = Intent.Pull('a');
  console.log(r3);
});