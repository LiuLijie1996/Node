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


//请求图片地址保存到本地
// app.get("/url", async function (req, res) {
//     let reqData = req.query;
//
//     let {data} = await axios.get(reqData.url, {
//         responseType: 'arraybuffer',//将二进制文件改成Buffer格式
//     });
//
//     let random = ~~(Math.random() * 10000000);
//
//     //将二进制文件保存到本地
//     fs.writeFile(`./public/images/${random}.jpg`, data, () => {});
//
//     res.send(`/images/${random}.jpg`);
// });


//获取潭州图片
app.get("/url", async function (req, res) {
    let reqData = req.query;

    let {data: {data: {list}}} = await axios.get(reqData.url);

    let arr = [];
    list.forEach(item => {
        let imgName = ~~(Math.random() * 1000000);
        let imgSrc = `https://res.shiguangkey.com/${item.cover}?x-oss-process=image/resize,m_mfit,w_222,h_132,limit_0/auto-orient,0/quality,q_100`;

        //请求图片地址
        axios.get(imgSrc, {
            responseType: 'stream',//数据以可读流的形式返回
        }).then(({data}) => {

            //获取图片后缀
            let imgSplit = item.cover.split(".");
            let hz = imgSplit[imgSplit.length - 1];
            //保存图片到本地
            data.pipe(fs.createWriteStream("./public/images/" + imgName + '.' + hz))
        });

        //保存图片地址到数组
        arr.push(imgSrc);
    });

    res.send(arr);
});