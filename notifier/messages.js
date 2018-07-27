var EOL = require('os').EOL

module.exports = {
  newVersion: function (packageName, currentVersion, latestVersion) {
    return '\u001b[36m\uD83D\uDEC8  There is a new version available for \u001b[4m' + packageName + '\u001b[24m: \u001b[37m' + latestVersion + EOL + '   \u001b[90mCurrent version: ' + currentVersion + '\u001b[39m'
  },
  deprecated: function (packageName, currentVersion, recommendedVersion) {
    return '\u001b[33m\uD83D\uDEC8  Your version of \u001b[4m' + packageName + '\u001b[24m \u001b[33mis deprecated. The recommended version is: \u001b[37m' + recommendedVersion + EOL + '   \u001b[90mCurrent version: ' + currentVersion + '\u001b[39m'
  }
}
