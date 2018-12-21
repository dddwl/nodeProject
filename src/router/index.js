//把路由封装成模块
const express = require('express');

// 引入单独路由模块
const checkloginRouter = require('./login.js');
const goodlist = require("./goodlist.js");
const city = require("./city.js")
const user1 = require("./user.js")
const order = require("./order.js")

let Router = express.Router();

//允许跨域
Router.all('*', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Content-Type,Content-Length, Authorization, Accept,X-Requested-With");
    res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");

    // 跨域请求CORS中的预请求
    if(req.method=="OPTIONS") {
      res.send(200);/*让options请求快速返回*/
    } else{
      next();
    }
});


// 关于登录的路由
Router.use('/checklogin',checkloginRouter);

//关于商品列表的路由
Router.use('/goodlist',goodlist);

//关于商品列表分类(城市)的路由
Router.use('/city',city);


//关于用户列表路由
Router.use('/user',user1);

//关于订单列表路由
Router.use('/order',order);




module.exports = Router;