let mongoose = require("mongoose");

//先定义student这个数据库中的banji表的规则
let banjiSchema = mongoose.Schema({
    name: {
        type: String,//数据类型
        required: true,//表示是否必须写
    },
    sex: {
        type: String,
        required: true,
    },
    yuwen: {
        type: Number,
        required: true,
    },
    shuxue: {
        type: Number,
        required: true,
    },
    yingyu: {
        type: Number,
        required: true,
    },
});

//让banji这个表应用banjiSchema
module.exports = mongoose.model('banji', banjiSchema);