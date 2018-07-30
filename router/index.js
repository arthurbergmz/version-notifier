var utils = require('./utils')
var providers = require('../providers')

module.exports = function (pkg, config, callback) {
  var packageName = utils.extractPropertyFromPackageOrObject(pkg, config, 'name', 'packageName')
  if (!packageName) {
    return callback(new Error('"packageName" was not found.'))
  }
  if (utils.isThisProject(pkg, config, packageName)) {
    return callback()
  }
  var customProvider = utils.extractPropertyFromObject(config, 'provider')
  if (customProvider) {
    var typeOfCustomProvider = typeof customProvider
    if (typeOfCustomProvider === 'string') {
      customProvider = providers[customProvider]
    } else if (typeOfCustomProvider === 'function') {
      customProvider = {
        isDependency: utils.defaultProvider.isDependency,
        resolver: customProvider
      }
    } else if (typeOfCustomProvider !== 'object') {
      return callback(new Error('Unknown custom provider type: ' + typeOfCustomProvider))
    }
  } else {
    var providerFromPackage = utils.getProviderFromPackage(pkg)
    if (providerFromPackage) {
      customProvider = providers[providerFromPackage]
    } else {
      customProvider = utils.defaultProvider
    }
  }
  if (!customProvider) {
    return callback(new Error('Provider not found.'))
  }
  var checkDependency = customProvider.isDependency
  if (!checkDependency(pkg, packageName)) {
    return callback()
  }
  var currentVersion = utils.extractPropertyFromPackageOrObject(pkg, config, 'version', 'currentVersion')
  if (!currentVersion) {
    return callback(new Error('"currentVersion" was not found.'))
  }
  customProvider.resolver(packageName, currentVersion, callback)
}
