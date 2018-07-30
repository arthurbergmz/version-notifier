var http = require('http')
var messages = require('../../notifier/messages')
var hasConnection = require('./hasConnection')
var isLatest = require('./isLatest')
var isCurrentDeprecated = require('./isCurrentDeprecated')
var isProjectDependency = require('./isProjectDependency')

module.exports = {
  isDependency: isProjectDependency,
  resolver: function (packageName, currentVersion, callback) {
    hasConnection(function (isConnected) {
      if (isConnected) {
        var options = {
          hostname: 'registry.npmjs.org',
          path: ('/' + packageName)
        }
        http.get(options, function (response) {
          var statusCode = response.statusCode
          if (statusCode === 503) {
            callback()
          } else if (statusCode === 404) {
            callback(new Error('Repository not found on NPM for ' + packageName + '.'))
          } else if (statusCode === 200) {
            var data = ''
            response
              .setEncoding('utf8')
              .on('data', function (chunk) {
                data += chunk
              })
              .on('end', function () {
                try {
                  data = JSON.parse(data)
                  var latest = isLatest(data, currentVersion)
                  if (latest) {
                    if (isCurrentDeprecated(data, currentVersion)) {
                      callback(null, messages.deprecated(packageName, currentVersion, latest.latest))
                    } else if (latest.comparison === 1) {
                      callback(null, messages.newVersion(packageName, currentVersion, latest.latest))
                    } else if (latest.comparison === -1) {
                      callback()
                    }
                  } else {
                    callback(new Error('"' + packageName + '" does not have published versions.'))
                  }
                } catch (err) {
                  callback(err)
                }
              })
          } else {
            callback(new Error('Unexpected status code: ' + statusCode), response)
          }
        })
      } else {
        callback()
      }
    })
  }
}
