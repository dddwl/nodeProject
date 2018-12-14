// 引入模块
const express = require("express");

//引入配置文件
const {port,host,root} = require("./config.json"); 


// 引入路由文件
const Router = require('./router/index.js');

// 生成http服务器
let app = express();


// 利用中间件实现静态资源服务器
app.use(express.static(root));

//路由
app.use(Router);

//监听端口
app.listen(port,()=>{
    console.log(`this is running on http:\/\/${host}:${port}`);
})