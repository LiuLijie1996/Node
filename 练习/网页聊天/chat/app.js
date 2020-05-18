const express = require("express");
const app = express();
const server = require('http').Server(app);
const io = require('socket.io')(server);

//开放静态资源
app.use(express.static("./static"));

//启动服务器
server.listen(3000, function () {
    console.log('3000端口启动成功');
});

app.get("/", function (req, res) {
    //重定向
    res.redirect("/index.html");
});


//记录登录的用户
let user_all = [];

io.on("connection", function (socket) {
    /*
    * 每个用户连接上之后，都会给该用户分配一个socket
    * 该用户一旦有任何动作时,都会触发他自身的socket对应的事件或方法
    * */


    //服务端订阅了登录事件
    socket.on('login', (data) => {
        //判断用户是否存在
        let user = user_all.find(item => item.user_name === data.user_name);

        if (user) {
            //用户存在
            socket.emit("login_err", {
                status:0,
                msg:"登录失败,用户名已经存在"
            })
        }else{
            //用户不存在
            //添加用户
            user_all.push(data);

            //告诉当前用户,登录成功
            socket.emit('login_enter', {
                status:1,
                msg:"登录成功",
                data
            });

            //告诉所有用户,有用户加入了聊天室
            io.emit("addUser", {
                status:1,
                msg:"有用户加入了聊天室",
                data
            });

            //告诉所有用户,有多少个用户加入了该聊天室
            io.emit("userList", {
                status:1,
                data:user_all
            })

            //把当前登录成功的用户信息存起来,方便后期退出时删除这个用户
            socket.user_info = data;
        }
    });


    //用户断开连接时触发该事件
    socket.on("disconnect", ()=>{
        //把当前用户的信息从users中删除掉
        let user_index = user_all.findIndex(item => item.user_name === socket.user_info.user_name);

        //删除掉断开连接的这个人
        user_all.splice(user_index, 1);
        //1.告诉所有人,有人离开了聊天室
        io.emit("delUser", {
            status:1,
            msg: "退出一个用户",
            data:socket.user_info
        });
        //2.告诉所有人,用户列表发生更新了
        io.emit("userList", {
            data:user_all
        })
    })



    //监听聊天的消息
    socket.on("sendMessage", data=>{
        // console.log(data);

        //广播给所有用户
        io.emit("receiveMessage", data)
    });



    //监听图片信息
    socket.on("sendImage", data=>{
        // console.log(data);

        //广播给所有用户
        io.emit("receiveImage", data)
    })
});



