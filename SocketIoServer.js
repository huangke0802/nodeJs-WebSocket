var app = require("express")();
var http = require("http").Server(app);
var io = require("socket.io")(http);
var fs = require("fs");

/* httpServer 设置 */
app.get("/", function (req, res) {
    function recall(data) {
        res.send(data.toString());
    }
    fs.readFile("./socketIoClient.html", function (err, data) {
        if (err) {
            console.log("bbb: " + err);
            recall("文件不存在");
        } else {
            recall(data);
        }
    })
});

//改变路径
app.get("/js/socket.io.js", function (req, res) {
    function recall(data) {
        res.send(data.toString());
    }
    fs.readFile("./js/socket.io.js", function (err, data) {
        if (err) {
            console.log("bbb: " + err);
            recall("文件不存在");
        } else {
            recall(data);
        }
    })
});

app.get("/js/jQuery.js", function (req, res) {
    function recall(data) {
        res.send(data.toString());
    }
    fs.readFile("./js/jQuery.js", function (err, data) {
        if (err) {
            console.log("bbb: " + err);
            recall("文件不存在");
        } else {
            recall(data);
        }
    })
});


/* WebSocket设置 */

//在线用户
var onlineUsers = {};
var idnex = 0;
io.on("connection", function (socket) {
    console.log("有人连上来了");

    //监听新用户加入
    // socket.on("login", function (obj) {
    socket.name = ++idnex;
    onlineUsers[socket.name] = socket;

    // });

    //监听用户退出
    socket.on("disconnect", function () {
        console.log("有人退出");
        //将用户从在线用户数组中删除
        delete onlineUsers[socket.name];
    });

    //监听用户发布聊天内容
    socket.on("message", function (msg) {
        //向所有客户端广播发布的消息
        // io.emit("message", obj);
        // console.log(socket.name + " 说：" + msg);
        //发回刚才发消息的用户自己
        // socket.send(socket.name + " 说：" + msg);
        //发给所有人
        sayAll(msg, socket);
    })

});

/**
 * 循环所有的在线用户，广播消息给他们每个人
 * @param {*} msg 消息
 * @param {*} onlineUsers 在线用户列表
 */
function sayAll(msg, socket){
    //循环
    for(var i in  onlineUsers){
        onlineUsers[i].send(socket.name + "说：" + msg);
    }
}

/* 两种服务统一监听 9000 端口 */
http.listen(9000, function () {
    console.log("listening on * : 9000");
});