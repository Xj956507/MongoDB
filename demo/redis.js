var express=require("express");
var app=express();
var redis=require("redis");
var client=redis.createClient("");

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


app.get("/add",function(req,res){
    //写入JavaScript(JSON)对象
     client.hmset('myHash', {"name":req.query.name,'age':req.query.age,"appellation":req.query.appellation,"phone":req.query.phone,"address":req.query.address}, function(err) {
        res.send("写入成功！")
    })   
})

app.get('/read',function(req,res){
     //读取JavaScript(JSON)对象
    client.hgetall('myHash', function(err, obj) {
        var sendData={
            code:200,
            data:obj
        }
        res.send(sendData)
    })
})

var server=app.listen(8002,function(){
    var host=server.address().address;
    var port=server.address().port;
})