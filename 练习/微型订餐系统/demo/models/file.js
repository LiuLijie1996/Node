let fs = require('fs');

//这个函数专门用来保存用户订餐信息
exports.saveData = function(data, callback) {
    fs.writeFile(`./data/${data.phone}.txt`, JSON.stringify(data), function(err) {
        if(err){
            //存储失败
            callback(-1)
        }else{
            //存储成功
            callback(1)
        }
    })
}

//这个函数专门用来获取所有用户订餐信息
exports.getAll = function(callback) {
    fs.readdir(`./data`, function(err, data) {
        if(err){
            //获取失败
            callback(-1)
        }else{
            //获取成功

            data = data.map(item=>{
                return item.split(".")[0];
            })
            callback(data)
        }
    })
}

//这个函数专门用来获取指定手机号的订餐信息
exports.getOne = function(phone, callback) {
    fs.readFile(`./data/${phone}.txt`, function(err, data) {
        if(err){
            //获取失败
            callback(-1)
        }else{
            //获取成功

            callback(data)
        }
    })
}