var path = require('path')
var versionChecker = require('./versionChecker')

function configRouter (obj, callback) {
  var isPackageJson = obj.versionNotifier
  if (isPackageJson) {
    versionChecker(obj, undefined, callback)
  } else {
    versionChecker(undefined, obj, callback)
  }
}

module.exports = function (pkg, config, callback) {
  if (typeof pkg === 'string') {
    pkg = require(path.normalize(pkg))
    if (!pkg) {
      return callback(new Error('Package file not found.'))
    }
  }
  if (typeof config === 'string') {
    config = require(path.normalize(config))
    if (!config) {
      return callback(new Error('Config file not found.'))
    }
  }
  if (pkg && (typeof pkg === 'object') && !config) {
    configRouter(pkg, callback)
  } else if (pkg && config) {
    configRouter(pkg, (typeof config === 'function') ? config : callback)
  } else if (!pkg && config) {
    versionChecker(null, config, callback)
  } else {
    var defaultPackage = path.join(process.cwd(), 'package.json')
    var defaultPackageObj = require(defaultPackage)
    if (!defaultPackageObj) {
      return callback(new Error('Package file not found: ' + defaultPackage))
    }
    versionChecker(defaultPackageObj, undefined, callback)
  }
}
