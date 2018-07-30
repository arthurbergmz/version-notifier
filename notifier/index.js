var isProd = require('./isProductionEnvironment')

module.exports = function (err, message) {
  if (!isProd) {
    if (err) {
      console.error(err)
    } else if (message) {
      process.stdout.write(message)
    }
  }
}
