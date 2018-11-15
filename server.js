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

const express = require('express')
const path = require('path')
const app = express()

app.use(express.static(path.join(__dirname, 'public')))

// 服务器监听端口
app.listen(9999, "127.0.0.1");