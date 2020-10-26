function getHelp () {

  console.log(`
    -setroot 设置项目所在文件夹
    
    -config 配置自动获取的文件
    
    -demo 查看配置文件正确格式
    
    -h | -help 获取帮助
    
    -v | -V | -version 获取版本内容
    
    powergit 手动获取
  `)
}
/*

    -auto 设置自动获取

    -stop 停止自动获取

    -start 开始自动获取

    -restart 重新启动服务

    -self 手动获取

*/
module.exports = getHelp
