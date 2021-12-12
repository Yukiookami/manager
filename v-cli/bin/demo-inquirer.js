const { program } = require('commander');
let inquirer = require("inquirer");
program.version('0.0.1');

program.option("-n ", "输出名称")
program.option("-t --type <type>", "项目类型")

inquirer.prompt([
    {
        name: "userName",
        type: "input",
        message: "你的名字叫什么？"
    },
    {
        name: "age",
        type: "checkbox",
        message: "你多大了？",
        choices: ["20-25", "25-30", "30-40", "40以上"]
    },
    {
        name: "salary",
        type: "list",
        message: "你的薪资多少？",
        choices: ["10K-20K", "20K-30K", "30K-40K"]
    }
]).then(answer => {
    console.log("回答内容：", answer)
})

program.parse(process.argv);