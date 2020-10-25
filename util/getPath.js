const path = require('path')
function getPath (file) {
  return path.join(__dirname, `../util/${file}.js`)
}

module.exports = getPath
