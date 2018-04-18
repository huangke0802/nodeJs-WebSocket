var app = require("express")();
var http = require("http").Server(app);
var io = require("socket.io")(http);
var fs = require("fs");
var ProtoBuf = require("protobufjs");
var MoveMsg = require('./userproto.js')['protobuf']['MoveMsg'];
console.log(MoveMsg);

/* WebSocket设置 */

//在线用户
var onlineUsers = {};
var idnex = 0;
io.on("connection", function (socket) {
    console.log("有人连上来了");
    socket.name = ++idnex;
    onlineUsers[socket.name] = socket;
    var moveMsg = new MoveMsg();
    
    moveMsg.typeid = 1;
    moveMsg.divid = socket.name;
    moveMsg.x = 0;
    moveMsg.y = 0;
     
    var buffer = moveMsg.encode().toBuffer();
    socket.send(buffer);


    //监听用户退出
    socket.on("disconnect", function () {
        console.log("有人退出");
        //将用户从在线用户数组中删除
        delete onlineUsers[socket.name];
    });

    //监听用户发布聊天内容
    socket.on("message", function (msg) {
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
        //不等于自己的时候才发送广播
        if (onlineUsers[i] != socket){
            onlineUsers[i].send(msg);
        }
        
    }
}

/* 两种服务统一监听 9000 端口 */
http.listen(9000, function () {
    console.log("listening on * : 9000");
});