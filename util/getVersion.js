const path = require("path")

function getVersion () {
  return require(path.join(__dirname, '../package.json')).version
}

module.exports = getVersion
