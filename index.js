var path = require('path')
var router = require('./router')
var notifier = require('./notifier')

function getDefaultPackage (onError) {
  var defaultPackage = path.join(process.cwd(), 'package.json')
  var defaultPackageObj = require(defaultPackage)
  if (defaultPackageObj) {
    return defaultPackage
  }
  onError(new Error('Package file not found: ' + defaultPackage))
}

module.exports = function (pkg, config, callback) {
  if (!callback) {
    callback = notifier
  }
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
    var defaultPackageObj = getDefaultPackage(callback)
    if (defaultPackageObj) {
      router(defaultPackageObj, pkg, callback)
    }
  } else if (pkg && config) {
    if (typeof config === 'function') {
      router(pkg, undefined, config)
    } else {
      router(pkg, config)
    }
  } else if (!pkg && config) {
    router(null, config, callback)
  } else {
    var defaultPackageObj = getDefaultPackage(callback)
    if (defaultPackageObj) {
      router(defaultPackageObj, undefined, callback)
    }
  }
}
