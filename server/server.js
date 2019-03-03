
const express= require('express');
const userRouter = require('./user')
const cookieParser =require('cookie-parser')
const bodyParser=require('body-parser')
const model=require('./model')
const User=model.getModel('user');
const Chat =model.getModel('chat')
const app=express();

const server =require('http').Server(app);
const io=require('socket.io')(server);
io.on('connection',function (socket) {
    // console.log('userLogin');
    socket.on('sendmsg',function (data) {
        // io.emit('recvmsg',data)
        const {from,to,msg}=data
        const chatid=[from,to].sort().join('_');
        Chat.create({chatid,from,to,content:msg},function (err,doc) {
           if(!err){
               io.emit('recvmsg',Object.assign(doc._doc))
           }
        })
    })
})
app.use(cookieParser());
app.use(bodyParser.json())
app.use('/user',userRouter)

server.listen(8080,function () {
    console.log('your dbPort is 8080')
});