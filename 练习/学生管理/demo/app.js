let Koa = require("koa");
let Router = require("koa-router");
let bodyParser = require("koa-bodyparser");
let render = require("koa-ejs");
let static = require("koa-static");
let mongoose = require("mongoose");
let path = require("path");
//创建服务
let app = new Koa();

//链接数据库
mongoose.connect(
    'mongodb://localhost:27017/students',
    {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }
).then(() => {
    console.log('数据库连接成功');

    //监听端口
    app.listen(3000, function () {
        console.log('3000端口监听成功');
    });
}).catch(err => {
    console.log('数据库连接失败');
});


//解析post数据,必须放在配置路由前,才会有效
app.use(bodyParser());
//开放静态资源
app.use(static('./public'));


//启动路由
let router = new Router();
//配置路由，一定要放在中间件的后面
app.use(router.routes()).use(router.allowedMethods());

//配置 koa-ejs
render(app, {
    root: path.join(__dirname, 'view'),//模板目录地址
    layout: 'template',//主模板文件名
    viewExt: 'html',//模板后缀
});


let {
    allStudent,
    showAddStu,
    addStu,
    showRmStu,
    removeStu,
    showUpStu,
    updateStu,
    showFindStu,
    findStu
} = require("./contorller/contorller");

router.get("/", allStudent);
router.get("/showAddStu", showAddStu);
router.get("/addStu", addStu);
router.get("/showRmStu", showRmStu);
router.get("/removeStu", removeStu);
router.get("/showUpStu", showUpStu);
router.get("/updateStu", updateStu);
router.get("/showFindStu", showFindStu);
router.get("/findStu", findStu);