import React from 'react';
import {Result} from 'antd-mobile'
import {connect} from 'react-redux'
import {WhiteSpace,List,Modal} from 'antd-mobile';
import {logoutSubmit} from '../../redux/user.redux';
import {clearChatLog} from '../../redux/chat.redux'
import {Redirect} from 'react-router-dom'

import browserCookie from 'browser-cookies'
@connect(
    state=>state.user,
    {logoutSubmit,clearChatLog}
)
class User extends React.Component{
     constructor(props){
         super(props)
     }
     logout=()=>{

         Modal.alert('注销','确定退出登录吗',[
             {text:'取消',onPress:()=>console.log('cancel')},
             {text:'确定',onPress:()=>{browserCookie.erase('userid')
                 // window.location.href=window.location.href
                 this.props.logoutSubmit();
                 this.props.clearChatLog();
             }}
             ])

         // console.log('logout')
         // this.props.location.push('')
     }
    render(){
        return this.props.name?(
         <div>
             <Result
             img={<img src={require(`../images/${this.props.avatar}.png`)} alt=''/>}
             title={this.props.name}
             >
             </Result>
             <WhiteSpace></WhiteSpace>
             <List>
                 <List.Item onClick={this.logout}>退出登录</List.Item>
             </List>
         </div>
        ):<Redirect to={this.props.RedirectTo}></Redirect>
    }
}
export default User