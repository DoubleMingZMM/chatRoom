// 引入http标准模块,CommonJS模块
// const http = require("http");
// const fs = require("fs");
//
// // 创建一个web服务器
// const server = http.createServer(function(request, response) {
//     request.setEncoding("utf8")
//     response.writeHead(200, {"Content-Type": "text/html"})
//
//     // 读取文件
//     const html = fs.readFileSync("index.html");
//     response.end(html);
// });
//
// // 服务器监听端口
// server.listen(9999, "127.0.0.1");



// 引入必须模块
// var express = require('express');
// var app = express();
// var http = require('http').Server(app);
// var io = require('socket.io')(http);
// var path = require('path');
//
// // 在线人数统计
// var onlineCount = 0;
// app.use(express.static(path.join(__dirname, 'public')))
//
// // 路径映射
// // app.get('/index', function (request, response) {
// //     response.sendFile(path.join(__dirname,'public/index.html'));
// // });
//
// // 当有用户连接进来时
// io.on('connection', function (socket) {
//     console.log('a user connected');
//
//     // 发送给客户端在线人数
//     io.emit('connected', ++onlineCount);
//
//     // 当有用户断开
//     socket.on('disconnect', function () {
//         console.log('user disconnected');
//
//         // 发送给客户端断在线人数
//         io.emit('disconnected', --onlineCount);
//         console.log(onlineCount);
//     });
//
//     // 收到了客户端发来的消息
//     socket.on('message', function (message) {
//         // 给客户端发送消息
//         io.emit('message', message);
//     });
//
// });
//
// var server = http.listen(9999, function () {
//     console.log('Sever is running');
// });


// 引入http标准模块,CommonJS模块
const http = require("http");
const fs = require("fs");
const ws = require("socket.io");

// 当前在线人数
let count = 0;

// 总访客人数
let totalCount = 0;

// 创建一个web服务器
const server = http.createServer(function(request, response) {
    request.setE
    response.writeHead(200, {
        "Content-Type": "text/html;charset=UTF-8"
    });

    // 读取文件
    const html = fs.readFileSync("public/index.html");
    response.end(html);

});

// 基于当前web服务器开启socket实例
const io = ws(server);

// 检测连接事件
io.on("connection", function(socket) {

    console.log("当前有用户连接");
    count++;
    totalCount++;
    console.log("count:" + count);

    let name = '';

    // 加入群聊
    socket.on("join", function(message) {
        console.log(message);
        name = message.name;
        console.log(name + "加入了群聊");

        // 给公众发消息
        socket.broadcast.emit("joinNoticeOther", {
            name: name,
            action: "加入了群聊",
            count: count
        });

        // 给自己发消息
        socket.emit("joinNoticeSelf", {
            count: count,
            id: totalCount
        });
    });

    // 接收客户端所发送的信息
    socket.on("message", function(message) {
        // console.log(message);
        // 向所有客户端广播发布的消息
        io.emit("message", message);
    });

    //	 监听到连接断开
    socket.on("disconnect", function() {
        --count;
        console.log(name + "离开了群聊")
        io.emit("disconnection", {
            count: count,
            name: name
        });
    });

});

// 服务器监听端口
server.listen(9999, "172.17.5.205");