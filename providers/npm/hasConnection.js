var dns = require('dns')

module.exports = function (callback) {
  dns.lookup('registry.npmjs.org', function (err) {
      if (err && err.code == 'ENOTFOUND') {
        callback(false);
      } else {
        callback(true);
      }
  })
}