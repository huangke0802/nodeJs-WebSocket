//连接本机的9000
var ws = new WebSocket("ws://127.0.0.1:9000/");    

ws.onopen = function() {     
   alert("Opened");     
   //ws.send("I'm client");  
   ws.send(buffer);      //改这行 
};     
     
ws.onmessage = function (evt) {      
    var chatroom = document.getElementById('chatroom');
    var bl = evt.data; // bl是要转换的blob
    var fr = new FileReader();
    var ab=null;
    fr.onload = function(){
        ab = this.result; // ab是转换后的结果
        var user = UserModel.decode(ab);
        chatroom.innerHTML += '<br/>'+user.uname;
    }
    fr.readAsArrayBuffer(bl);    
};      
     
ws.onclose = function() {     
   alert("Server Closed");     
};     
     
ws.onerror = function(err) {     
   alert("Error: " + err);     
}; 