const fs = require('fs')
const path = require('path')
const args = process.argv.slice(1)
function changeConfig () {
  try {
    fs.writeFileSync(path.join(__dirname, '../filePath/config-path.txt'), args[2])
    console.log('设置配置文件成功')
  } catch (e) {
    console.error('设置配置文件失败，请重新设置')
  }
}

module.exports = changeConfig
