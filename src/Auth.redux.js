import { createStore } from 'redux'
import axios from 'axios'
const LOGIN='LOGIN';
const LOGOUT='LOGOUT';
const USER_DATA='USER_DATA';
const LOGIN_DATA='LOGIN_DATA'
const store = createStore(auth)
const init = store.getState();
const initState={
    isAuth:false,
    name:'111',
    age:'24'
}
export function auth(state=initState,action){

    switch(action.type){
        case LOGIN :
        return {...state,isAuth:true};
        case LOGOUT :
        return {...state,isAuth:false};

        case USER_DATA:
        return {...state,name:action.payload.name,age:action.payload.age}
        default:
        return state
    }
}
export function getUserState(){
    return dispatch=>{
        axios.get('/data').then(res=>{
            if(res.status=='200'){
                dispatch(userData(res.data[0]))

            }
      })
    }
}
export function getLoginData(userInfo) {
         return {type:LOGIN_DATA,payload:userInfo}
}
export function userData(data){
    return  {type:USER_DATA,payload:data}
}
export function login(){
    return {type:LOGIN}
}
export function logout(){
    return {type:LOGOUT}
}
