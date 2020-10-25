const spawn = require("child_process").spawnSync;

function getLogFilePath () {
  const ls = spawn('echo $HOME;', {shell: true})
  return `${ls.stdout.toString().trim()}/Desktop`
}
module.exports = getLogFilePath
