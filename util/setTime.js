const readline = require('readline')
const fs = require('fs')
const path = require('path')

const setAuto = require('./setAuto')

async function setTime() {
  console.log('请按照指定格式设定世间范围，详情请见 README.md 文件。错误设置会导致定时失效')
  const result = await readSyncByRl(`请设置时间格式：`)
  const confirm = await readSyncByRl('请确认格式是否正确：y/n')
  if (['Y', 'y', 'yes', ''].includes(confirm)) {
    console.log('已设置')
    fs.writeFileSync(path.join(__dirname, '../filePath/crontab-time.txt'), result.trim())
    setAuto()
  } else {
    console.log('已取消')
  }
}

function readSyncByRl(tips) {
  return new Promise((resolve) => {
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout
    });

    rl.question(tips, (answer) => {
      rl.close();
      resolve(answer.trim());
    });
  });
}

module.exports = setTime
