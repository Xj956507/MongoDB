var express=require("express");
var app=express();
var redis=require("redis");
var client=redis.createClient("");

app.get("/add",function(req,res){
    //写入JavaScript(JSON)对象
     client.hmset('myHash', {"username":req.query.username,'age':req.query.age}, function(err) {
        res.send("写入成功！")
    })   
})

app.get('/read',function(req,res){
    if(err){
        console.log("ERROR"+err)
    }else{
        //读取JavaScript(JSON)对象
        client.hgetall('myHash', function(err, object) {
             res.send("读写成功！"+object)
        })
    }
})

var server=app.listen(8002,function(){
    var host=server.address().address;
    var port=server.address().port;
})