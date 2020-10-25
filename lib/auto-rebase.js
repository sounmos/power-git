const path = require("path")
const args = process.argv.slice(1)

const getPath = require(path.join(__dirname, `../util/getPath.js`))
const getVersion = require(getPath('getVersion'))
const getHelp = require(getPath('getHelp'))
const self = require(getPath('self'))
const getDemo = require(getPath('getDemo'))
const setRoot = require(getPath('setRoot'))
const changeConfig = require(getPath('changeConfig'))

function run () {
  switch (args[1]) {
    case "-setroot":
      return setRoot();
    case "-config":
      return changeConfig();
    case "-demo":
      return getDemo();
    case "-h":
      return getHelp();
    case "-help":
      return getHelp();
    case "-v":
      return showVersion();
    case "-V":
      return showVersion();
    case "-version":
      return showVersion();
    case "-auto":
      return setAuto();
    case "-stop":
      return stop();
    case "-restart":
      return restart();
    case "-self":
      return self();
    default:
      return self();
  }
}

function showVersion() {
  console.log(getVersion())
}

function setAuto() {
  console.log('设置自动获取')
}

function stop() {
  console.log('停止自动获取')
}

function restart () {
  console.log('自动获取重新启动')
}

run()
