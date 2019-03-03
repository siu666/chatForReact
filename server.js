var express = require('express');
var app = express();
app.all('*', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
    res.header("X-Powered-By",' 3.2.1')
    res.header("Content-Type", "application/json;charset=utf-8");
    next();
});

app.get('/',function(req,res){
    res.send('for test')
});
app.get('/jsontest', function (req, res) { //添加的代码
    let myjson = {
        name : '盒装牛奶',
        price : '3元',
        date : '2018年1月1日'
    }
    res.send(myjson);
})
var server =app.listen(8081,function(){
    var host = server.address().address;
    var port = server.address().port;
})