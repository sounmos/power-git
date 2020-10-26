const fs = require('fs')
const path = require('path')
const args = process.argv.slice(1)
const setAuto = require('./setAuto')
function setTimeFile() {

  let configPath = args[2] || path.join(__dirname, '../filePath/crontab-time-default.json')

  const timeConfig = JSON.parse(fs.readFileSync(configPath).toString())

  const configType = [
    'minute',"hour","day","month","week",
  ]
  let time = ''

  for (let i = 0; i < 5; i++) {
    let item = timeConfig.find(child => child.type === configType[i])

    time += item.time || '*'

    time += item.step ? `/${item.step} ` : ' '
  }
  console.log('文件已设置')
  fs.writeFileSync(path.join(__dirname, '../filePath/crontab-time.txt'), time.trim())
  setAuto()
}

module.exports = setTimeFile
