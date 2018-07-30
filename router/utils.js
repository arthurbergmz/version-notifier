var defaultProvider = require('../providers/npm')

module.exports = {
  defaultProvider: defaultProvider,
  isThisProject: function (pkg, obj, packageName) {
    if (obj) {
      var objPackageName = obj.packageName
      if (objPackageName === packageName) {
        return true
      }
    }
    if (pkg) {
      return pkg.name === packageName
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
  extractPropertyFromPackageOrObject: function (pkg, obj, pkgPropertyName, objPropertyName) {
    if (obj) {
      var objPropertyValue = obj[objPropertyName]
      if (objPropertyValue) {
        return objPropertyValue
      }
    }
    if (pkg) {
      return pkg[pkgPropertyName]
    }
    return undefined
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