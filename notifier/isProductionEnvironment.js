var isProd = false
var env = process.env.NODE_ENV
if (env) {
  env = env.toLowerCase()
  isProd = env === 'production' || env === 'prod'
}

module.exports = isProd