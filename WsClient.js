//连接本机的9000
var ws = new WebSocket("ws://127.0.0.1:9000/");      

ws.onopen = function() {       
//    alert("Opened");
   ws.send("I'm client");       
};       
       
ws.onmessage = function (evt) {        
    // alert(evt.data);
    var chatroom = document.getElementById("chatroom");  
    chatroom.innerHTML +=  "<p>" + evt.data + "</p>";     
};       
//服务端关闭       
ws.onclose = function() {       
   alert("Closed");       
};       
       
ws.onerror = function(err) {       
   alert("Error: " + err);       
};   