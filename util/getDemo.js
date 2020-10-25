const path = require('path')
const config = require(path.join(__dirname, '../const/pull-config.json'))

function getDemo () {
  console.log(config)
}

module.exports = getDemo
