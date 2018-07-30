var utils = require('./utils')
var providers = require('../providers')

module.exports = function (parentPkg, pkg, provider, callback) {
  var packageName = utils.extractPropertyFromObject(pkg, 'name')
  if (!packageName) {
    return callback(new Error('Property "name" was not found in package definition.'))
  }
  if (utils.isThisProject(parentPkg, packageName)) {
    return callback()
  }
  if (provider) {
    var typeOfProvider = typeof provider
    if (typeOfProvider === 'function') {
      provider = {
        isDependency: utils.defaultProvider.isDependency,
        resolver: customProvider
      }
    } else if (typeOfProvider !== 'object') {
      return callback(new Error('Unknown provider type: ' + typeOfProvider))
    }
  } else {
    var providerFromPackage = utils.getProviderFromPackage(pkg)
    if (providerFromPackage) {
      provider = providers[providerFromPackage]
    } else {
      provider = utils.defaultProvider
    }
  }
  if (!provider) {
    return callback(new Error('Provider not found.'))
  }
  var isDirectDependency = provider.isDependency
  if (isDirectDependency && !isDirectDependency(parentPkg, packageName)) {
    return callback()
  }
  var currentVersion = utils.extractPropertyFromObject(pkg, 'version')
  if (!currentVersion) {
    return callback(new Error('Property "version" was not found in package definition.'))
  }
  provider.resolver(packageName, currentVersion, callback)
}
