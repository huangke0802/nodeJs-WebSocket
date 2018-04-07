var app = require("express")();
var http = require("http").Server(app);
var io = require("socket.io")(http);
var fs = require("fs");

var User = require('./userproto.js')['protobuf']['User'];
var user = new User({});


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
        console.log(msg);
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
        onlineUsers[i].send(msg);
    }
}

/* 两种服务统一监听 9000 端口 */
http.listen(9000, function () {
    console.log("listening on * : 9000");
});