const mongoose = require('mongoose');
const DB_URL='mongodb://localhost:27017/reactApp';
mongoose.connect(DB_URL);
const models={
    user:{
        'name':{type:String,require:true},
        'pwd':{type:String,require:true},
        'type':{type:String,require:true},
        //头像
        'avatar':{type:String,require:true},
        //简介
        'condition':{type:String,require:true},
        'pos':{type:String,require:true},
        //boss的特殊字段
        'company':{type:String,require:true},
        'salary':Number,
    },
    chat:{
        'chatid':{type:String,require:true},
        'from':{type:String,require:true},
        'to':{type:String,require:true},
        'read':{type:Boolean,default:false,require:true},
        'content':{type:String,default:'',require:true},
        'create_time':{type:Number,require:true,'default':new Date().getTime()}
    }
}
for(let i in models){
    mongoose.model(i,new mongoose.Schema(models[i]))
}
//node输出变量
module.exports={
    // getModel:function (name) {
    //     return mongoose.model(name)
    // }
     getModel(collection){
         return mongoose.model(collection)
}
}