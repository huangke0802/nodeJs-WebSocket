//动态变异protoBuf
var fs = require("fs");
ProtoBuf = require("protobufjs");
userProtoStr = fs.readFileSync("./user.proto").toString();

User = ProtoBuf.loadProto(userProtoStr).build("protobuf").User;

user = new User();
user.set("uid", 111);
user.set("uname", "12345");
user.set("pwd", "aabbcc");

/* 编码 */
//编码并压缩成buffer
var buffer = user.encode().toBuffer();

/* 解码 */
var userInfo = User.decode(buffer);

console.log(userInfo.get("uname"));
