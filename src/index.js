const inquirer = require('inquirer')
const chalk = require('chalk')
const createTask = require('../src/create')


const parseArgs = rawArgs => {

    const firstArg = rawArgs[2] ? rawArgs[2].toLowerCase() : null;
    const secontArg = rawArgs[3] ? rawArgs[3] : null
 

    const action = firstArg === 'i' ? 'init' : firstArg==='init'? 'init' : null
    const projectName = action === 'init' && secontArg ? secontArg : 'myMp-init'
    return {
        action,
        projectName     
    }
}

// 与命令行交互 询问
const promptQuestions = async() => {

    const validateProjectName = async (input) => {
        const regex = /^[a-zA-Z0-9\-\_]+$/;
        const isValid = regex.test(input);
        return isValid ? true : chalk.red('Invalid project name')
    }
 
    const validateAppid = input => {
     const  regex = /^wx[a-z0-9]+$/
     const isValid = regex.test(input);
     return isValid ? true : chalk.red('Invalid wechart AppID')
    }

    const questions = [
        {
            type: 'input',
            name: 'projectName',
            message: '请输入你的项目名称',
            transformer: function(input) {
                return chalk.green(input)
              },
            validate: validateProjectName
        },
        {
            type: 'input',
            name: 'appId',
            message: '请输入已经注册过的AppID',
            transformer: function(input) {
                return chalk.green(input)
              },
              validate: validateAppid
        },
       
    ];
 
    const answers = await inquirer.prompt(questions);
    const projectOptions = {};
    projectOptions.projectName = answers.projectName
    projectOptions.appId = answers.appId
    projectOptions.sass = answers.sass
    return projectOptions;

}


const cli = async(args) => {
    const { action,projectName } = parseArgs(args)
    if(!action){
        console.log(chalk.red('if you want init project please input mp-wx-cli init yourProjectName'))
    }
    switch(action){
     case 'init':
        const projectOptions = await promptQuestions()
        await createTask.create(projectOptions)
         break
    
    }
   
}


 exports.cli = cli