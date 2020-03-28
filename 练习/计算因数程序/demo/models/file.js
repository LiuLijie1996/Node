let fs = require("fs");

//读取data目录中有没有之前查询的因数
exports.read = function (num, callback) {
    //读取文件，fs传入的路径必须是入口文件的路径开始
    fs.readFile("./data/" + num + '.txt', function(err,data) {
        if (err) {
           //执行回调函数传入 -1 表示没有该文件
           callback(-1);
        }else{
            //将读取到的数据传给回调
            callback(JSON.parse(data));
        }
    })
}

//写入数据到data目录中
exports.write = function (num, data) {
    //写入文件，fs传入的路径必须是入口文件的路径开始
    fs.writeFile("./data/" + num + '.txt', JSON.stringify(data), function(err) {
        if (err) {
            console.log('写入失败');
        }else{
            console.log('写入成功');
        }
    })
}