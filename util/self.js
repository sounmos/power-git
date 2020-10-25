const fs = require('fs')
const path = require('path')
const spawn = require("child_process").spawnSync;
const getLogFilePath = require(path.join(__dirname, './getLogFilePath.js'))

const rootDir = getFileText('../filePath/root-dir-path.txt')

const logFile = `${getLogFilePath()}/代码rebase出现问题-请及时查看.txt`

const configFilePath = getFileText('../filePath/config-path.txt')

let configJson = []

function self () {
  if (!rootDir) {
    throw new Error(`未明确项目所在文件夹，尝试使用 'merge -setroot <文件路径>' 命令`)
  }
  if (configFilePath.startsWith('../const')) {
    configJson = require(path.join(__dirname, configFilePath))
  } else {
    configJson = require(configFilePath)
  }
  start_pull()
}
function start_pull () {
  if (!checkConfig(configJson)) {
    throw new Error('配置文件格式出错')
  } else {
    start_rebase_code(configJson)
  }
}

function start_rebase_code(config) {
  config.forEach(item => {

    if (item.branch.length) {

      item.branch.forEach(branch => {

        let shell = getShell(item.project, branch)

        let ls = spawn(shell, { shell: true });

        checkGit(ls.stdout.toString(), item.project, branch)
      })
    }
  })
}

function getShell(project, branch) {
  return `
        cd ${rootDir}/${project};
        git checkout ${branch};
        git pull origin master --rebase;
      `
}
function resetShell(project, branch, more) {
  return `
        cd ${rootDir}/${project};
        git checkout ${branch};
        ${more};
        `
}

function getErrorMsg (project, branch, str) {
  const date = new Date()
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const week = date.getDay()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  const time = `\n${year}-${month}-${day},周${week},${hour}:${minute}:${second}\n`
  return `${time}项目：${project}，分支为：${branch}; \n错误信息：${str}`
}

function checkGit (str, project, branch) {
  console.log(str)
  if (!(
    ['error', 'failed', 'git rebase --abort', 'git rebase --continue'].every(item => str.indexOf(item) === -1)
  )) {
    const logMsg = getErrorMsg(project, branch, str)
    spawn(`echo '${logMsg}' >> ${logFile}`, {shell: true})
    spawn(resetShell(project, branch, 'git rebase --abort'), {shell: true})
  } else {
    spawn(resetShell(project, branch, `git push origin ${branch} -f`), {shell: true})
  }
}

function checkConfig (config) {
  if (!isArray(config)) {
    return false
  }
  for (let i = 0, len = config.length; i < len; i++) {
    if (typeof config[i] !== 'object') {
      return false
    }
    if (!isArray(config[i].branch)) {
      return false
    }
  }
  return true
}

function isArray (data) {
  return Object.prototype.toString.call(data) === '[object Array]'
}

function getFileText (file) {
  return fs.readFileSync(path.join(__dirname, file)).toString().trim()
}
module.exports = self
