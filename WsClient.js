//连接本机的9000
var ws = new WebSocket("ws://127.0.0.1:9000/");    

var User = require('./userproto.js')['protobuf']['User'];
var user = new User({});

ws.onopen = function() {       
//    alert("Opened");
//    ws.send("I'm client"); 
    ws.send(buff);      
};       
       
ws.onmessage = function (evt) {        
    // alert(evt.data);
    
    var chatroom = document.getElementById("chatroom");  
    //字符串形式的拼接
    // chatroom.innerHTML +=  "<p>" + evt.data + "</p>";  
    
    /* protobuf形式的拼接 */
    //解析protobuf
    var msg = User.decode(data);
    chatroom.innerHTML += "<p>" + msg.uname + "</p>";
};       
//服务端关闭       
ws.onclose = function() {       
   alert("Closed");       
};       
       
ws.onerror = function(err) {       
   alert("Error: " + err);       
};   