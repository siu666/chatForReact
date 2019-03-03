import {createStore} from 'redux'
import axios from 'axios'
import io from 'socket.io-client'
const socket = io('ws://localhost:8080')
const MSG_LIST='MSG_LIST'
const MSG_RECV='MSG_RECV';
const MSG_READ='MSG_READ';
const MSG_CLEAR='MSG_CLEAR';
const initState={
    chatmsg:[],
    unread:0,
    users:{}
}
export function  chat(state=initState,action) {
    switch(action.type){
        case MSG_CLEAR:
            return {...initState}
        case MSG_LIST:
            return {...state,users:action.payload.users,chatmsg:action.payload.msgs,unread:action.payload.msgs.filter(v=>!v.read&&v.to==action.payload.userid).length}
        case MSG_RECV:
            const n=action.payload.to==action.userid?1:0

            return {...state,chatmsg:[...state.chatmsg,action.payload],unread:state.unread+n}
        case MSG_READ:
            const {from,num}=action.payload
            return {...state,chatmsg:state.chatmsg.map(v=>({...v,read:from==v.from?true:v.read})),unread:state.unread-num}
        default:
            return state
    }
}
const store=createStore(chat);

function msgList(msgs,users,userid) {

    return {type:MSG_LIST,payload:{msgs,users,userid}}
}
function msgRecv(msg,userid) {
    return {userid,type:MSG_RECV,payload:msg}
}
function msgRead({from,userid,num}){
    return {type:MSG_READ,payload:{from,userid,num}}
}
export function readMsg(from) {
    return (dispatch,getState)=>{
          axios.post('/user/readmsg',{from}).then(res=>{
              const userid=getState().user._id;
              if(res.status=='200'&&res.data.code==0){
                   dispatch(msgRead({userid,from,num:res.data.num}))
              }
          })
    }
}
export function recvMsg() {
    console.log('进入了接收')
    return (dispatch,getState)=>{
        console.log('进入了接收1')
        socket.on('recvmsg',function (data) {
              console.log('进入了接收2')
                console.log('recvmsg',data)
                const userid=getState().user._id;
                (data.to==userid||data.from==userid)?dispatch(msgRecv(data,userid)):''
           }
        )
        
    }
}
export function sendMsg({from,to,msg}) {
    return dispatch=>{
        socket.emit('sendmsg',{from,to,msg})
    }
}
function clearLog() {
    return {type:MSG_CLEAR}
}
export function clearChatLog() {
    return dispatch=>{
        dispatch(clearLog())
    }
}
export function getMsgList() {
    return (dispatch,getState)=>{
        axios.get('/user/getmsglist').then(res=>{
            if(res.status=='200'&&res.data.code=='0'){
                const userid=getState().user._id
                dispatch(msgList(res.data.msgs,res.data.users,userid))
            }
        })
    }
}