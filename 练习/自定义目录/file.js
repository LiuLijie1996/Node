let fs = require("fs");
let path = require("path");

function file(data, dirname = __dirname) {
    let {fileName, type, children} = data;

    let path_join = path.join(dirname, fileName);
    console.log(fs.existsSync(path_join));

    //判断路径是否存在
    if (!fs.existsSync(path_join)) {
        //判断是不是目录
        if (type === 'dir') {
            //创建目录
            fs.mkdirSync(path_join);

            //遍历子项,将之前拼接的路径传给当前的函数
            children.forEach(item => {
                file(item, path_join)
            })
        } else {
            fs.writeFileSync(path_join, '我是海文');
        }
    }
};

exports.file = file;