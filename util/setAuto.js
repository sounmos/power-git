const fs = require('fs')
const path = require('path')
const spawn = require("child_process").spawnSync;

function setAuto () {
  const runJs = path.join(__dirname, '../lib/auto-rebase.js')

  const cronPath = path.join(__dirname, '../filePath/crontab-auto.txt')
  const crontabTime = path.join(__dirname, '../filePath/crontab-time.txt')

  const nodePath = spawn('which node', { shell: true }).stdout.toString().trim()

  if (!nodePath) {
    console.error('请安装node之后再使用本工具')
    return
  }

  writeCrontab(nodePath, runJs, cronPath, crontabTime)
}

function writeCrontab (nodePath, runJs, cronPath, crontabTime) {
  const time = fs.readFileSync(crontabTime).toString().trim()

  spawn(`crontab -r`, { shell: true })

  fs.writeFileSync(cronPath, `${time} source /etc/profile && ${nodePath} ${runJs}`)

  spawn(`cat ${cronPath} | crontab -`, { shell: true })
  console.log('已修改为定时同步，可使用 pgit -stop 停止')
}

module.exports = setAuto
