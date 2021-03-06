//关于商品列表的路由


//引入模块
const express = require("express");
const mongodb = require("mongodb");
const bodyParser = require("body-parser");

//引入文件
const operationDBS = require("./operationDBS.js")

// 获取Mongo客户端
const MongoClient = mongodb.MongoClient;

let Router = express.Router();
let urlencoded = bodyParser.urlencoded({ extended: false });

//查询所有商品列表 /goodlist
Router.get('/',urlencoded,(req,res)=>{
    // console.log("req.body",req.body);
    // let {username,password} = req.body;
    MongoClient.connect('mongodb://localhost:27017',(err, database)=>{
        //连接成功后执行这个回调函数
        if(err) throw err;

        // 使用某个数据库，无则自动创建
        let db = database.db('nodeproject');

        // 使用集合
        let user = db.collection('goods');

        // 查询所有
        user.find().sort({id:1}).toArray((err,result) => {
            let length = 0;
            length = result.length;
            // console.log(length)
            result.length =  result.length>10 ? 10 :result.length;
            if(result){
            
                res.send({
                    code : 1,
                    data : result,
                    length,
                    msg  : "所有商品列表数据"
                })
            }else{
                res.send({
                    code : 0,
                    data : result,
                    length,
                    msg  : "查询所有商品列表数据出错"
                })
            }

        });

        // 关闭数据库，避免资源浪费
        database.close();

    });
});

//查询某页商品列表 /goodlist
Router.get('/apage',urlencoded,(req,res)=>{
    // console.log("req.body",req.body);
    let {page,qty,type,desc} = req.query;
    var obj ={}
    obj[type] = desc*1;//键名代表排序方式,键值代表升序(1)或是降序(-1);
    //console.log(obj);
    MongoClient.connect('mongodb://localhost:27017',(err, database)=>{
        //连接成功后执行这个回调函数
        if(err) throw err;

        // 使用某个数据库，无则自动创建
        let db = database.db('nodeproject');

        // 使用集合
        let user = db.collection('goods');

        // 查询所有商品
        user.find().skip((page-1)*qty).limit(qty*1).sort(obj).toArray((err,result) => {
            if(result){
                res.send({
                    code : 1,
                    data : result,
                    msg  : `第${page}页商品列表数据`
                })
            }else{
                res.send({
                    code : 1,
                    data : result,
                    msg  : `查询错误第${page}页商品列表数据出错`
                })
            }

        });

        // 关闭数据库，避免资源浪费
        database.close();

    });
});

//
//
//
//查
Router.get('/async',async (req,res)=>{
    //获取所有分类
    //console.log({id:req.query.id*1})
    let data
    try{
        data = await operationDBS.find('goods',{id:req.query.id*1});
    }catch(err){
        data = err;
    }

    res.send(data);
});

//增
Router.put('/async',urlencoded,async(req,res)=>{console.log(req.body)
    let data
    try{
        data = await operationDBS.insert('goods',{...req.body,add_time:Date.now()});
    }catch(err){
        data = err;
    }

    res.send(data);
})

//删(单个)
Router.delete('/async',urlencoded,async(req,res)=>{
    let data
    let id = req.body.id*1;  
    try{
        data = await operationDBS.delete('goods',{id});
    }catch(err){
        data = err;
    }

    res.send(data);
})

//改(改1条)
Router.post('/async',urlencoded,async(req,res)=>{
    // console.log(req.body);
    let data
    try{
        data = await operationDBS.update('goods',{id:req.body.id*1},{state:req.body.state});
    }catch(err){
        data = err;
    }

    res.send(data);
})

//改多个数据
Router.post('/async1',urlencoded,async(req,res)=>{
    // console.log(req.body);
    var obj = {...req.body}
    obj.id = req.body.id*1;
    let data
    try{
        data = await operationDBS.update('goods',{id:req.body.id*1},obj);
    }catch(err){
        data = err;
    }

    res.send(data);
})




// 模糊查询
Router.get('/asyncmohu',urlencoded,(req,res)=>{
    // console.log("req.body",req.body);
    // let {username,password} = req.body;
    MongoClient.connect('mongodb://localhost:27017',(err, database)=>{
        //连接成功后执行这个回调函数
        if(err) throw err;

        // 使用某个数据库，无则自动创建
        let db = database.db('nodeproject');

        // 使用集合
        let user = db.collection('goods');
        //console.log(req.query)
        // 查询所有
        user.find({city:req.query.city,shop:{$regex:req.query.shop,$options:'i'}}).toArray((err,result) => {
            // console.log()
            let length = 0;
            length = result.length;
            // console.log(length)
            //result.length =  result.length>10 ? 10 :result.length;
            if(result){
            
                res.send({
                    code : 1,
                    data : result,
                    length,
                    msg  : "所有商品列表数据"
                })
            }else{
                res.send({
                    code : 0,
                    data : result,
                    length,
                    msg  : "查询所有商品列表数据出错"
                })
            }

        });

        // 关闭数据库，避免资源浪费
        database.close();

    });
});

module.exports = Router;