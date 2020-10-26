const fs = require('fs')
const path = require('path')
const spawn = require("child_process").spawnSync;
const getLogFilePath = require(path.join(__dirname, './getLogFilePath.js'))

const rootDir = getFileText('../filePath/root-dir-path.txt')

const logFile = `${getLogFilePath()}/代码rebase出现问题-请及时查看.txt`

let configFilePath = getFileText('../filePath/config-path.txt')

let configJson = []

// 开始方法，校验部分文件是否存在
function start () {
  if (!rootDir) {
    throw new Error(`未明确项目所在文件夹，尝试使用 'merge -setroot <文件路径>' 命令`)
  }
  if (configFilePath === '') {
    configFilePath = '../filePath/config-default.json'
  }
  if (configFilePath.startsWith('../')) {
    configJson = require(path.join(__dirname, configFilePath))
  } else {
    configJson = require(configFilePath)
  }
  start_pull()
}

// 校验配置文件格式
function start_pull () {
  if (!checkConfig(configJson)) {
    throw new Error('配置文件格式出错')
  } else {
    start_rebase_code(configJson)
  }
}

// 开始同步代码
function start_rebase_code(config) {
  config.forEach(item => {

    if (item.branch.length) {

      let currentBranch = getCurrentBranch(item.project)

      item.branch.forEach(branch => {

        console.log(`当前项目：${item.project}，当前分支: ${branch} …………`)

        let shell = getShell(item.project, branch)

        let ls = spawn(shell, { shell: true });

        checkGit(ls.stdout.toString(), item.project, branch)

        resetPrevBranch(item.project, currentBranch)
      })
    }
  })
}

// 返回到之前分支
function resetPrevBranch (project, prevBranch) {
  spawn(`
    cd ${rootDir}/${project};
    git checkout ${prevBranch}
  `, { shell: true })
}
// 获取之前分支名称
function getCurrentBranch (project) {
  return spawn(`
    cd ${rootDir}/${project};
    git branch | awk  '$1 == "*"{print $2}'
  `, { shell: true }).stdout.toString().trim()
}
// 切换到对应分支，开始rebase
function getShell(project, branch) {
  return `
        cd ${rootDir}/${project};
        git checkout ${branch};
        git pull origin master --rebase;
      `
}
// rebase完成，查看是推送还是回退
function resetShell(project, branch, more) {
  return `
        cd ${rootDir}/${project};
        git checkout ${branch};
        ${more};
        `
}
// 编写错误记录，并提示
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
// 检查当前同步是否成功
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
// 检查配置文件是否符合格式
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
module.exports = start
