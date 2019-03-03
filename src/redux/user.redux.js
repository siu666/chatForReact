import {createStore} from 'redux'
import axios from 'axios'
import {getRedirectPath} from "../util";
const ERROR_MSG='ERROR_MSG';
const AUTH_SUCCESS='AUTH_SUCCESS'
const LOGIN_DATA='LOGIN_DATA';
const LOGOUT='LOGOUT'
const initState={
    RedirectTo:'',
    msg:'',
    name:'',
    pwd:'',
    type:''
}
export function user(state=initState,action){
    switch (action.type){
        case AUTH_SUCCESS:
            return {...state,msg:'',RedirectTo:getRedirectPath(action.payload),...action.payload};
        case LOGIN_DATA:
            return {...state,...action.payload};
        case LOGOUT:
            return {...initState,RedirectTo:'/login'}
        case ERROR_MSG:
            return {...state,isAuth:false,msg:action.msg};
        default:
            return state
    }
};
const store=createStore(user);

function errorMsg(msg) {
    return {msg,type:ERROR_MSG}
}
export function getLoginData(userinfo) {
    return {type:LOGIN_DATA,payload:userinfo}
}
export function authSuccess(info) {
    return {type:AUTH_SUCCESS,payload:info}
}
export function update(obj) {
    return dispatch=>{
        axios.post('/user/update',obj).then(res=>{
            if(res.status=='200'&&res.data.code=='0'){
                dispatch(authSuccess(res.data.data))
            }else{
                dispatch(errorMsg(res.data.msg))
            }
        })
    }
}
export function register({name,pwd,confirmPwd,type}) {
    if(!user||!pwd||!confirmPwd){
        return errorMsg('用户名密码必须输入')
    }
    if(pwd!==confirmPwd){
        return errorMsg('密码和确认密码不同');
    }
    return dispatch=>{
        axios.post('/user/register',{name,pwd,type}).then(res=>{
               if(res.status=='200'&&res.data.code=='0'){
                   dispatch(authSuccess({name,pwd,type}))
               }else{
                   dispatch(errorMsg(res.data.msg))
               }
        })
    }
}
export function login({name,pwd}){
    if(!name||!pwd){
        return errorMsg('用户名或密码不能为空')
    }
    return dispatch=>{
        axios.post('/user/login',{name,pwd}).then(res=>{
            if(res.status=='200'&&res.data.code=='0'){
                dispatch(authSuccess(res.data.data))
            }else{
                dispatch(errorMsg(res.data.msg))
            }
        })
    }
}
export function logoutSubmit() {
    return {type:LOGOUT}
}