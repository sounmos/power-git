const path = require("path")
const args = process.argv.slice(1)

const getPath = require(path.join(__dirname, `../util/getPath.js`))
const getVersion = require(getPath('getVersion'))
const getHelp = require(getPath('getHelp'))
const getDemo = require(getPath('getDemo'))
const setRoot = require(getPath('setRoot'))
const changeConfig = require(getPath('changeConfig'))
const setAuto = require(getPath('setAuto'))
const start = require(getPath('start'))
const stop = require(getPath('stop'))

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
    case undefined:
      return start();
    default:
      return console.log('无效输入')
  }
}

function showVersion() {
  console.log(getVersion())
}

run()
