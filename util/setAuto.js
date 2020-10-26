const fs = require('fs')
const path = require('path')
const spawn = require("child_process").spawnSync;

function setAuto () {
  const runJs = path.join(__dirname, '../lib/auto-rebase.js')

  const cronPath = path.join(__dirname, '../filePath/crontab-auto.txt')

  const nodePath = spawn('which node', { shell: true }).stdout.toString().trim()

  if (!nodePath) {
    console.error('请安装node之后再使用本工具')
    return
  }

  writeCrontab(nodePath, runJs, cronPath)
}

function writeCrontab (nodePath, runJs, cronPath) {
  spawn(`echo '*/1 * * * * source /etc/profile && ${nodePath} ${runJs}`, { shell: true })

  spawn(`cat ${cronPath} | crontab -`, { shell: true })
  console.log('已修改为定时同步，可使用 pgit -stop 停止')
}

module.exports = setAuto
