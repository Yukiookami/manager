/**
 * 项目克隆
 */
let { promisify } = require('util')
const ora = require("ora")
const download = promisify(require("download-git-repo"))
const shell = require("shelljs")
let chalk = require("chalk")


// 日志打印函数
const log = content => console.log(chalk.yellow(content))

module.exports = async (appName) => {
    log(`🚀 创建项目 ${appName}`)
    shell.rm("-rf", appName);
    const spinner = ora("下载中...").start();
    try {
        await download("direct:https://git.imooc.com/coding-502/manager-fe.git", appName, { clone: true })
        spinner.succeed("下载完成")
        log(`
下载完成，请执行下面命令启动项目：
===========================
cd ${appName}
yarn 或者 npm init 

npm run dev
或者
yarn dev
        `)
    } catch (error) {
        log(`下载失败`, error)
        spinner.stop();
    }
}