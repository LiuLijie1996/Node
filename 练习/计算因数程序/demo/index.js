let express = require("express");
let bodyParser = require("body-parser");
let ejs = require("ejs");
let {fn} = require("./contorller/contorller");

//创建服务
let app = express();

//开放静态目录
app.use(express.static("static"));

//解析前端发送的post请求
app.use(bodyParser.urlencoded({ extended: false }));

//使用ejs模板引擎
app.set("view engine", 'ejs');

//监听端口
app.listen(3000, function(){
    console.log('3000端口监听成功');
})


//监听路由
app.get("/:num", fn)
