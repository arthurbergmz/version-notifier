module.exports = function (pkgObj, packageName) {
  var dependencies = pkgObj['dependencies']
  var devDependencies = pkgObj['devDependencies']
  return (dependencies && dependencies[packageName]) || (devDependencies && devDependencies[packageName])
}
