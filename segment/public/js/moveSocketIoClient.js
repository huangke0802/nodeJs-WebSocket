//写在Wsclient.js前面
if (typeof dcodeIO == "undefined" || !dcodeIO.ProtoBuf) {
    alert("出错");
}

//创建ProtoBuf
var ProtoBuf = dcodeIO.ProtoBuf;
var MoveMsg = ProtoBuf.loadProtoFile("/js/user.proto").build('protobuf.MoveMsg');
var moveInfo = new MoveMsg();

var iosocket = io.connect("http://localhost:9000/");
window.onload = function () {
    //监听连接
    iosocket.on("connect", function () {
        console.log("连接成功");
    });
    //监听服务端发来的消息
    iosocket.on("message", function (message) {
        var moveMsg = MoveMsg.decode(message);
        var typeid = moveMsg.typeid;
        var divid = "d" + moveMsg.divid;
        var movediv = document.getElementById(divid);
        //如果typeid==0移动div
        if (typeid == 0) {
            movediv.style.left = moveMsg.x + "px";
            movediv.style.top = moveMsg.y + "px";
        } else { //如果等于1，加载指明div移动 
            DivMove.apply(movediv);
            moveInfo.divid = moveMsg.divid;
            moveInfo.typeid = 0;
        }
    });

    //监听服务端连接断开
    iosocket.on("disconnect", function () {
        alert("服务端断开");
    });
};

function DivMove() {
    var flag = 0;
    var dx = 0;
    var dy = 0;
    this.onmousedown = function () {
        var e = event || window.event;
        dx = e.screenX - parseInt(this.style.left);
        dy = e.screenY - parseInt(this.style.top);
        flag = 1;
    }
    var thisa = this;
    document.onmousemove = function () {
        if (flag == 1) {
            var e = event || window.event;
            thisa.style.left = e.screenX - dx + 'px';
            thisa.style.top = e.screenY - dy + 'px';
            moveInfo.x = e.screenX - dx;
            moveInfo.y = e.screenY - dy;
            var moveInfoBuf = moveInfo.encode().toBuffer();
            iosocket.send(moveInfoBuf);
        }
    }
    this.onmouseup = function (e) {
        flag = 0;
    }
}