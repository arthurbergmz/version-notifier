var defaultProvider = require('../providers/npm')

module.exports = {
  defaultProvider: defaultProvider,
  isThisProject: function (parent, packageName) {
    if (parent) {
      return parent.name === packageName
    }
    throw new Error('Package name not found!')
  },
  validateProvider: function (providerObj) {
    if (!providerObj.resolver) {
      throw new Error('Resolver not found in provider object!')
    } else if (typeof providerObj.resolver !== 'function') {
      throw new Error('Resolver is not a function!')
    } else if (!providerObj.isDeprecated) {
      providerObj.isDeprecated = defaultProvider.isDeprecated
    }
    return providerObj
  },
  extractPropertyFromObject: function (obj, propertyName) {
    if (obj) {
      return obj[propertyName]
    }
    return undefined
  },
  getProviderFromPackage: function (pkg) {
    if (pkg) {
      var obj = pkg.versionNotifier
      if (obj) {
        return obj.provider
      }
    }
    return undefined
  }
}