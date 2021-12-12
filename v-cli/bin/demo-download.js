let download = require("download-git-repo")
download('direct:https://gitee.com/jack-bean/rocket-cli.git', 'Demo1', { clone: true }, function (err) {
    console.log(err ? 'Error' : 'Success')
})