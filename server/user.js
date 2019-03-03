const express =require('express');
const Router = express.Router();
const model=require('./model')
const User=model.getModel('user');
const Chat =model.getModel('chat')
// Chat.remove({},function (e,d) {
//
// })
Router.get('/info',function (req,res) {
    const {userid}=req.cookies;
    if(!userid){
        //没id的时候默认让前端跳回login页
      return  res.json({code:'1'})
    }
    User.findOne({_id:userid},function (err,doc) {
          if(err){
             return res.json({code:'1',msg:'后端异常'})
          }
          if(doc){
             return res.json({code:'0',data:doc})
          }
    })
});
Router.get('/getmsglist',function (req,res) {
    const user=req.cookies.userid;
    // '$or':[{from:user},{to:user}]
    User.find({},function (e,userDoc) {
        let users={};
        userDoc.forEach(v=>{
            users[v.id]={name:v.name,avatar:v.avatar}
        })
        Chat.find({'$or':[{from:user},{to:user}]},function (err,doc) {
            if(!err){
                return res.json({code:0,msgs:doc,users:users})
            }
        })
    })

})
Router.post('/readmsg',function (req,res) {
      const userid=req.cookies.userid
      const {from} = req.body
    Chat.update(
        {from,to:userid},
        {'$set':{read:true}},
        {'multi':true}
        ,function (err,doc) {
          console.log(doc)
        if(!err){
            return res.json({code:'0',num:doc.nModified})
        }
        return res.json({code:'1',msg:'修改失败'})
    })
})
Router.post('/update',function (req,res) {
    const userid=req.cookies.userid
    if(!userid){
        return res.json({code:'1'})
    }
    User.findByIdAndUpdate(userid,req.body,function (err,doc) {
        const data=Object.assign(doc,req.body)
        return res.json({code:'0',data:data})
    })
})
Router.post('/register',function (req,res) {
        const {name,pwd,type}=req.body;
        User.findOne({name:name},function (err,doc) {
            if(doc){
                return res.json({code:'1',msg:'用户名重复'})
            }
            const userModel= new User({name,type,pwd});
            userModel.save(function (e,d) {
                    if(e){
                        return res.json({code:'1',msg:'后端异常'})
                    }
                    const {name,pwd,type}=d;
                    res.cookie('userid',d._id)
                    return res.json({code:'0',data:{name,type,pwd}})
            })
        })
})
Router.post('/list',function (req,res) {
        const {type,skip}=req.body;

    let UserModel=User.find({type:type});
        UserModel.sort({name:1}).skip(parseInt(skip)).limit(10)
        UserModel.exec({type:type},function (e,d) {
        if(e){
            return res.json({code:'1',msg:'接口异常'})
        }
            return   res.json({code:'0',data:d,Len:d.length})
        })
})
Router.get('/testlist',function (req,res) {
    const {type}=req.body
    let UserModel=User.find({type:type});
    UserModel.sort({name:1}).skip(0).limit(5)
    UserModel.exec({type:'genius'},function (e,d) {
        if(e){
            return res.json({code:'1',msg:'接口异常'})
        }
        return   res.json({code:'0',data:d})
    })
})
Router.post('/login',(req,res)=>{
    const {name,pwd}=req.body;
    User.findOne({name:name,pwd:pwd},function (err,doc) {
        if(!doc){
            return res.json({msg:'用户名或密码错误'})
        }
        res.cookie('userid',doc._id)
        return res.json({code:'0',data:doc})
    })
})
module.exports =Router