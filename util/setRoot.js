const fs = require('fs')
const path = require('path')
const args = process.argv.slice(1)
function setRoot() {
  try {
    fs.writeFileSync(path.join(__dirname, '../filePath/root-dir-path.txt'), args[2])
    console.log('设置项目目录成功')
  } catch (e) {
    console.error('设置项目目录失败，请重新设置')
  }
}

module.exports = setRoot
