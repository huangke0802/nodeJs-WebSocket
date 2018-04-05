var net = require('net');
var port = 9000;
var host = '127.0.0.1';

var User = require('./userproto.js')['protobuf']['User'];
var user = new User({});

var client = new net.Socket();
// client.setEncoding('UTF-8');
// client.setEncoding('binary');  //二进制发送
//连接到服务端
client.connect(port, host, function () {
    user.uid = 101;
    user.uname = '黄小珊';
    user.pwd = 'haha';
    //编码加密
    var buffer = user.encode().toBuffer();
    //发出
    client.write(buffer);
    say();
});

client.on('data', function (data) {
    // console.log('服务端传来:' + data);
    //解析buf
    var msg = User.decode(data);
    console.log("uname : " + msg.uname);
    say();
});
client.on('error', function (error) {
    console.log('error:' + error);
    //client.destory();

});
client.on('close', function () {
    console.log('Connection closed');
});
//-------------------------输入---------------------------------
const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

function say() {
    rl.question('请输入： ', (inputStr) => {
        if (inputStr != 'bye') {
            user.uname = inputStr;
            var buffer = user.encode().toBuffer();
            client.write(buffer);
            // client.write(inputStr + '\n');
            say();
        } else {
            client.destroy(); //关闭连接
            rl.close();
        }
    });
}