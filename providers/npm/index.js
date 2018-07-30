var isProjectDependency = require('./isProjectDependency')
var isCurrentDeprecated = require('./isCurrentDeprecated')

module.exports = {
  isDependency: isProjectDependency,
  resolver: function (packageName, currentVersion, callback) {
    // TODO
  }
}