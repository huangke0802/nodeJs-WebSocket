var net = require('net');  
var chatServer = net.createServer(),      //创建服务端Server
    clientList = [];  
    clientMap=new Object();

var User = require('./userproto.js')['protobuf']['User'];
var user = new User({});

var ii=0;  //连接名称的流水号
chatServer.on('connection', function(client) {  
	console.log('有人连上来了')
  // JS 可以为对象自由添加属性。这里我们添加一个 name 的自定义属性，用于表示哪个客户端（客户端的地址+端口为依据）  
  //client.name = client.remoteAddress + ':' + client.remotePort;    
  //client.write('Hi ' + client.name + '!\n');    
  //clientList.push(client);
    client.name=++ii;
    clientMap[client.name]=client;
  //client.setEncoding('utf-8');
   //超时事件
//    client.setTimeout(timeout,function(){
//        console.log('连接超时');
//        client.end();
//    });

  client.on('data', function(data) {
      //解析客户端传来的buf
      var msg = User.decode(data);
      console.log('客户端传来:' + msg);
     //client.write('你发来:'+data);
     // 接受来自客户端的信息
     console.log("uname : " + msg.uname);
      broadcast(data, client);
  });
  //数据错误事件
    client.on('error',function(exception){
        console.log('client error:' + exception);
        client.end();
    });
    //客户端关闭事件
    client.on('close',function(data){
        delete clientMap[client.name];
        console.log(client.name+'下线了');
        broadcast(client.name+'下线了',client);

    });
  
});  
function broadcast(message, client) {
    for(var key in clientMap){
        clientMap[key].write( message);
        // clientMap[key].write(client.name+'say:'+message+'\n');
    }
}  
chatServer.listen(9000); 
