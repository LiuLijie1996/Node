//这个模块,可以在前后端向某个服务器发送请求
let axios = require("axios");
let express = require("express");

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



app.get("/url", async function (req, res) {
    let reqData = req.query;

    let {data} = await axios.get(reqData.url);

    let dom = new JSDOM(data);//解析html文本
    let document = dom.window.document;//定义变量是为了减少书写长度,也可以不用这么做
    let content = document.querySelector('.read-content').innerHTML;//获取文本内容(包含标签)

    res.send(content);
});