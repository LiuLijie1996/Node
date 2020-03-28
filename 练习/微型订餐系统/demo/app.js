let express = require("express");
let bodyParser = require("body-parser");
let { order, showAll, showOne } = require('./controller/controller');
let ejs = require("ejs");

let app = express();

app.listen(3000, function () {
    console.log('3000端口监听成功');
})

//解析前端发送的post请求
app.use(bodyParser.urlencoded({ extended: false }));

//开放静态资源
app.use(express.static('public'));

//使用ejs模板引擎
app.set("view engine", 'ejs');


//订餐
app.post('/dingcan', order);

//查询所有订单
app.get('/all', showAll);

//查询用户订单
app.get('/all/:phone', showOne);



