var mongoose=require('mongoose');
var db=mongoose.createConnection("localhost","testList");
var express=require("express");
var app=express();
var bodyParser=require('body-parser');
var urlencodedParser = bodyParser.urlencoded({ extended: false })
db.on("error",function(err){
    console.log("ERROR"+err);
})
db.once("open",function(){
    console.log("数据库连接成功！");
})

app.all('*',function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Content-Length, Authorization, Accept, X-Requested-With , yourHeaderFeild');
    res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');

    if (req.method == 'OPTIONS') {
        res.send(200); /让options请求快速返回/
    }else {
        next();
    }
});


var Schema=new mongoose.Schema({
    id:String,
    name:String,
    appellation:String,
    age:Number,
    phone:String,
    address:String
},{
    versionKey:false
})

// 第三个参数为数据库表
var personModel=db.model("people",Schema,"Students");

// 增加数据
app.get('/create',function(req,res){
    var beta=new personModel({
        name:req.query.name,
        age:req.query.age,
        appellation:req.query.appellation,
        phone:req.query.phone,
        address:req.query.address
    })
    beta.save(function(err){
        if(err){
            console.log('ERROR'+err)
        }else{
            res.send("创建成功！")
        }
    })  
})

// 删除数据(根据数据库自己创建的_id进行操作)
app.get("/delete",function(req,res){
    var ObjectID = require('mongodb').ObjectID;
    personModel.findByIdAndRemove({_id: new ObjectID(req.query.id)},function(err,docs){
        if(err){
            console.log("删除失败"+err)
        }else{
            res.send("删除成功！")
        }
    })
})


//修改数据
app.post('/update',urlencodedParser,function(req,res){
    var id = req.body.id; 
    var sid = mongoose.Types.ObjectId(id)
    personModel.findByIdAndUpdate(sid,{
        $set:{
            name:req.body.name,
            age:req.body.age,
            appellation:req.body.appellation,
            phone:req.body.phone,
            address:req.body.address
        }
    },function(err){
        if(err){
            console.log("修改失败")
        }else{
            res.send("修改成功！")
        }
    });     
})

//通过查询数据
app.get('/readById',function(req,res){
    personModel.findById({
        id:req.query.userId
    },function(err,docs){
        if(err){
            console.log("查询失败")
        }else{
             res.send("查询成功!"+docs)
        }
    })
})

//通过年龄查询
app.get("/readByCustomize",function(req,res){
    personModel.find({
        $where:req.query.js
    },function(err,docs){
        if(err){
            console.log("查询失败")
        }else{
            console.log("查询结果"+docs)
        }
        res.send(docs)
    })
    
})

//查询全部数据
app.get('/readAll',function(req,res){
    personModel.find({},function(err,docs){
        if(err){
            console.log("查询失败")
        }else{
            console.log(docs)
        }
        res.send(docs)
    })
})


var server=app.listen(8052,function(err){
    var host=server.address().address;
    var port=server.address().port;
})

