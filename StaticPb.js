//静态解析protobuf
var ProtoBuf = require("protobufjs"); 
var User = require('./userproto.js')['protobuf']['User'];
var user = new User({
    'uid': 101,
    'uname': '你好',
    'pwd': 'haha'
});

//编码
var buffer = user.encode();    
console.log('buffer=' + buffer);

//加密 
var msgbuf = buffer.toBuffer();   
console.log('msgbuf=' + msgbuf);

//--------解码---------------------    
var userbuf = User.decode(msgbuf);
console.log(userbuf.uname);   