import axios from 'axios'
const USER_LIST='USER_LIST';
const MORE_USER_LIST='MORE_USER_LIST';
const GET_REQ_LEN='GET_REQ_LEN'
const initState={
    userList:[],
    reqListLength:'',
};
export function userList (state=initState,action) {
    switch (action.type){
        case USER_LIST:
            return {...state,userList:action.payload.data,reqListLength:action.payload.Len}
        case MORE_USER_LIST:
            return {...state,userList:[...state.userList,...action.payload.data],reqListLength:action.payload.Len}
        default:
            return state
    }
}
function setUserList(data,Len) {
      return {type:USER_LIST,payload:{data,Len}}
}
function getMoreUserList(data,Len) {
    return {type:MORE_USER_LIST,payload:{data,Len}}
}
export function requetUserList(type,beginPos) {
    // console.log(type+';'+currentPage)
    return dispatch=>{
        axios.post('/user/list',{type:type,skip:beginPos}).then(res=>{
                if(res.data.code=='0'){
                    if(beginPos==0){
                        dispatch(setUserList(res.data.data,res.data.Len))

                    }else{
                        dispatch(getMoreUserList(res.data.data,res.data.Len))
                    }
                }
        })
    }
}