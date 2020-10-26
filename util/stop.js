const spawn = require('child_process').spawnSync
function stop () {
  spawn('crontab -r', { shell: true })
}

module.exports = stop
