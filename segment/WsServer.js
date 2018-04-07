 //导入ws模块，server是它的属性,ws模块是最新的ws协议，IE会报错不识别ws
 var WebSocketServer = require('ws').Server,
     wss = new WebSocketServer({
         port: 9000
     });
var clientMap = new Object();

var User = require('./userproto.js')['protobuf']['User'];
var user = new User({});

var index = 0;
 wss.on('connection', function (ws) {
     console.log(ws + '上线');
     ws.name = ++index;
     clientMap[ws.name] = ws;
     ws.on('message', function (message) {
        //  console.log('received: %s', message);
        //  broadCast(message, ws);

         /* protoBuf传输 */
         //解析
         var msg = User.decode(message);
         console.log('客户端传来:' + msg);
         console.log("uname : " + msg.uname);
         broadCast(message, ws);

     });
     //  ws.send('something');
     ws.on('close', function () {
         global.gc(); //调用内存回收：运行时使用node --expose-gc WsServer.js 不然这一行会报错
         console.log("leave");
     });
 });

 /**
  * 循环发送消息给所有人
  * @param {*} msg 消息
  * @param {*} socket socket客户端对象 
  */
 function broadCast(msg, socket)
 {
     for(var key in clientMap)
     {
         //字符串的发送
        //  clientMap[key].send(socket.name + "说：" + msg);

        //protobuf的发送
         clientMap[key].send(msg);


     }
 }