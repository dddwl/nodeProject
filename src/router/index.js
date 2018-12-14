//把路由封装成模块
const express = require('express');

// 引入单独路由模块
const checkloginRouter = require('./login.js');

let Router = express.Router();

// 关于登录的路由
Router.use('/checklogin',checkloginRouter);


module.exports = Router;