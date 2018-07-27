var messages = require('./messages')
var isProd = require('./isProductionEnvironment')

module.exports = function (packageName, currentVersion, latestVersion, comparison) {
  if (isProd()) return
  if (comparison === 1) {
    process.stdout.write(messages.newVersion(packageName, latestVersion))
  } else if (comparison === -1) {
    process.stdout.write(messages.deprecated(packageName, currentVersion, latestVersion))
  }
}
