module.exports = function () {
  var env = process.env.NODE_ENV
  if (env) {
    env = env.toLowerCase()
    return env === 'production' || env === 'prod'
  }
  return false
}
