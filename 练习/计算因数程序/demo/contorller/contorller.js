let {math} = require("../models/math");
let {read} = require("../models/file");
let {write} = require("../models/file");

exports.fn = function(req, res) {
    let {num} = req.params;

    //初始时间
    let start = new Date;

    /*
        先查询本地是否有 当前计算的数字因数
        没有：那就计算因数数组，然后把因数数组存入到本地
        有：那就直接读取本地的因数数组
    */
    read(num, function(result) {
        if (result === -1) {
            //等于-1说明没有
            //计算因数,存储因数
            result = math(num);
            write(num, result);
        }

        //返回给前端
        res.render('demo',{
            arr:result,
            start:new Date - start
        });
    })
}