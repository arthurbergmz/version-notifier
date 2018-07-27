var semver = require('semver')

module.exports = function (registry, currentVersion) {
  if (!registry || typeof registry !== 'object') return null
  var distTags = registry['dist-tags']
  if (!distTags) return null
  var latest = distTags['latest']
  if (!latest) return null
  return {
    latest: latest,
    comparison: semver.compare(latest, currentVersion)
  }
}
