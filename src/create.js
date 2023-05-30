const execa = require('execa')
const ora = require('ora')
const chalk = require('chalk')
const fs = require('fs')

const copyTask = require('./copy')

// spinner
const spinner = ora(`loading...\n`)

let path = `${process.cwd()}`

async function create(props) {
    const { projectName, appId } = props
    // spinner.start()
    path = `${path}/${projectName}`

    try {
        await execa('mkdir', [path])
        // fs.mkdirSync(`${projectName}`)
        // 复制模板
        await copyTemplate( )

        // 读取 模板 project.config.json 文件  更改配置信息
        const wechatConfig = await readWechatProjectConfigJson()
        wechatConfig.appid = appId
        wechatConfig.projectname = projectName

        const configStr = JSON.stringify(wechatConfig)
        await writeWechatProjectConfigJson(projectName, configStr)
        //    spinner.stop()
        console.log(chalk.green(`
       ******************************************
       * "${projectName}" 已经初始化成功
       *
       * 请使用微信开发者工具打开项目： "${projectName}"
       * 
       * ok  ✔️✔️✔️
       *
       ******************************************
         `))

    } catch (e) {
        spinner.fail(chalk.red(e))
    }
}

// 读取wechart配置
async function readWechatProjectConfigJson() {
    return new Promise((resolve, reject) => {
        fs.readFile(`${__dirname}/templates/project.config.json`, function (err, data) {
            if (err) {
                reject(err)
            }
            resolve(JSON.parse(data.toString()))
        })
    })
}

// 写入配置
async function writeWechatProjectConfigJson(path, str) {
    return new Promise((resolve, reject) => {
        fs.writeFile(`${path}/project.config.json`, str, function (err, data) {
            if (err) {
                reject(err)
            }
            resolve()
        })
    })
}

// 复制模板
async function copyTemplate() {
   
    copyTask.copyDir(`${__dirname}/templates`, path)

    return Promise.resolve()

}


exports.create = create


