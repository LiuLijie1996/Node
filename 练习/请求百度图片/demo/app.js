//这个模块,可以在前后端向某个服务器发送请求
let axios = require("axios");
let express = require("express");
let fs = require("fs");

const url = require("url");
const queryString = require("querystring");

//在后台环境中可以解析html格式的字符串
let jsdom = require("jsdom");
let {JSDOM} = jsdom;


//搭建服务
let app = express();

app.use(express.static("./public"));

//监听端口
app.listen(3000, function () {
    console.log('3000端口监听成功');
});


//获取百度图片
app.get("/url", async function (req, res) {
    let reqData = req.query;

    //请求数据
    let {data: {data}} = await axios.get(reqData.url);


    let arr = [];
    data.forEach((item, index) => {

        if (!item.thumbURL) return;

        //请求图片地址
        axios.get(item.thumbURL, {
            responseType: 'stream',//数据以可读流的形式返回
        }).then(({data}) => {

            //获取图片后缀
            let imgSplit = item.thumbURL.split(".");
            let hz = imgSplit[imgSplit.length-1];
            //保存图片到本地
            data.pipe(fs.createWriteStream("./public/images/" + index + '.' + hz))
        });


        arr.push(`${item.thumbURL}`)
    });


    res.send(arr);
});


function fnUrl(link, callback) {
    // 将url字符串转换成一个对象,并获取查询字符串
    let {query} = url.parse(link);
    // console.log( query );

    // 将 查询字符串 转换成一个对象
    let queryObj = queryString.parse(query);
    // console.log( queryObj );

    // 将 对象 还原成一个 查询字符串
    let queryStr = queryString.stringify(queryObj);
    // console.log(queryStr);

    callback(query, queryObj, queryStr)
}