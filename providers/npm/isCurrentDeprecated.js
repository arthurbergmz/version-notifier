module.exports = function (registry, currentVersion) {
  if (!registry || typeof registry !== 'object') return null
  var versions = registry['versions']
  if (!versions) return false
  var version = versions[currentVersion]
  if (!version) return false
  return version.deprecated
}
