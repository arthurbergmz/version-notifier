var path = require('path')
var router = require('./router')
var notifier = require('./notifier')

function main (pkg, customProvider, callback) {
  if (!pkg) {
    return notifier(new Error('You must specify a valid package.json!'))
  }
  var typeOfPkg = typeof pkg
  if (typeOfPkg === 'string') {
    var pkgPath = path.normalize(path.join(pkg, 'package.json'))
    pkg = require(pkgPath)
    if (!pkg) {
      return notifier(new Error('Couldn\'t load ' + pkgPath + '.'))
    }
  } else if (typeOfPkg !== 'object') {
    return next(new Error('The first parameter must be a string or an object.'))
  }
  if (!pkg.name || !pkg.version) {
    return notifier(new Error('Invalid package declaration: missing "name" and "version" properties.'))
  }
  if (customProvider) {
    var typeOfCustomProvider = typeof customProvider
    if (typeOfCustomProvider === 'object') {
      if (!customProvider.resolver) {
        return notifier(new Error('Providers objects must have a resolver.'))
      }
    } else if (typeOfCustomProvider === 'function') {
      if (!callback && customProvider.length < 3) {
        callback = customProvider
        customProvider = undefined
      }
    } else {
      return notifier(new Error('Unknown type of provider: ' + typeOfCustomProvider))
    }
  }
  if (callback) {
    if (typeof callback !== 'function') {
      return notifier(new Error('Callback must be a function.'))
    }
  } else {
    callback = notifier
  }
  var parentPkgPath = path.join(path.dirname(require.main.filename), 'package.json')
  var parentPkg = require(parentPkgPath)
  if (!parentPkg) {
    return notifier(new Error('Parent package file not found: ' + parentPkgPath))
  }
  router(parentPkg, pkg, customProvider, callback)
}

main(__dirname)

module.exports = main