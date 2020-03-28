let { saveData, getAll, getOne } = require('../models/file');

exports.order = function (req, res) {
    //获取前端的数据
    let reqData = req.body;

    //保存数据
    saveData(reqData, function (result) {
        //返回给前端保存状态
        res.send({
            status: result,
            msg: result === -1 ? "订餐失败" : "订餐成功"
        })
    })
};


exports.showAll = function (req, res) {
    //获取数据
    getAll(function (result) {
        if (result==='-1')return;

        //渲染all.ejs
        res.render('all', {
            result
        })

    })
}

exports.showOne = function (req, res) {
    //获取手机号
    let {phone} = req.params;

    //获取数据
    getOne(phone, function(result){
        if (result==='-1')return;

        //渲染showOne.ejs
        res.render('showOne', {
            result:JSON.parse(result)
        })
    })
}