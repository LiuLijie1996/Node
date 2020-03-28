let Banji = require("../models/students");


//展示所有学生
exports.allStudent = async function (cxt) {
    let result = await Banji.find().sort({yuwen:-1});

    await cxt.render("index", {
        result
    })
};

//显示添加学生页面
exports.showAddStu = async function (cxt) {
    await cxt.render("showAddStu")
};

//添加学生信息
exports.addStu = async function (cxt) {
    let status = 0;
    let msg = '';

    //获取前端传来的数据
    let res = cxt.query;

    //查询是否有该学生
    let data = await Banji.findOne({
        name: res.name,
        sex: res.sex,
    });

    if (data) {
        msg = "该学生已存在";
    } else {
        //存储学生的信息
        await Banji.create(res);

        status = 1;
        msg = "添加成功";
    }

    //返回数据给前端
    cxt.body = {
        status,
        msg
    };
};


//显示添加学生页面
exports.showRmStu = async function (cxt) {
    await cxt.render("showRmStu")
};

//删除学生信息
exports.removeStu = async function (cxt) {
    let status = 0;
    let msg = '';

    //获取前端传来的数据
    let res = cxt.query;

    //查询是否有该学生
    let data = await Banji.findOne({
        name: res.name,
    });

    if (data) {
        //删除学生
        await Banji.deleteOne(res);

        status = 1;
        msg = "删除成功";
    } else {
        msg = "该学生不存在";
    }

    //返回数据给前端
    cxt.body = {
        status,
        msg
    };
};

//显示修改学生页面
exports.showUpStu = async function (cxt) {
    await cxt.render("showUpStu")
};

//修改学生信息
exports.updateStu = async function (cxt) {
    let status = 0;
    let msg = '';

    //获取前端传来的数据
    let res = cxt.query;

    //查询是否有该学生
    let data = await Banji.findOne({
        name: res.name,
    });

    if (data) {
        //修改学生信息
        await Banji.updateOne(
            {
                name: res.name,
            },
            {
                $set:res
            }
        );

        status = 1;
        msg = "修改成功";
    } else {
        msg = "该学生不存在";
    }

    //返回数据给前端
    cxt.body = {
        status,
        msg
    };
};

//显示查找学生页面
exports.showFindStu = async function (cxt) {
    await cxt.render("showFindStu")
};

//查找学生信息
exports.findStu = async function (cxt) {
    let status = 0;
    let msg = '';

    //获取前端传来的数据
    let res = cxt.query;

    //查询是否有该学生
    let data = await Banji.find({
        name: res.name,
    });

    if (data.length) {
        status = 1;
        msg = "查找成功";
    } else {
        msg = "该学生不存在";
    }

    //返回数据给前端
    cxt.body = {
        status,
        msg,
        data
    };
};