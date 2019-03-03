import React from 'react';
import {connect} from 'react-redux';
import {NavBar} from 'antd-mobile'
import {NavLinkBar } from '../navLink/navLink'
import NavBarLink from "../navLink/navLink";
import {Route,Switch} from 'react-router-dom';
import Boss from  '../../component/boss/boss'
import Genius from '../../component/genius/genius'
import User from '../../component/user/user'
import {getMsgList,recvMsg} from "../../redux/chat.redux";
import Msg from '../msg/msg'
// import Msg from '../../component/msg/msg'


import './index.css'


@connect(
    state=>state,
    {getMsgList,recvMsg}
)
class DashBoard extends React.Component{
    componentDidMount(){
        console.log(new Date().getTime())
        if(!this.props.chat.chatmsg.length){
            this.props.getMsgList();
            this.props.recvMsg()
        }
    }
    componentWillUnmount(){
         console.log('getout')
    }
    render(){
        // console.log(this.props)
        const navList=[
            {
                path:'/boss',
                text:"牛人",
                icon:'boss',
                title:'牛人列表',
                component:Boss,
                hide:this.props.user.type=='genius'
            },
            {
                path:'/genius',
                text:"boss",
                icon:'job',
                title:'boss列表',
                component:Genius,
                hide:this.props.user.type=='boss'
            },
            {
                path:'/msg',
                text:"消息",
                icon:'msg',
                title:'消息列表',
                component:Msg,
            },
            {
                path:'/me',
                text:"我的",
                icon:'user',
                title:'个人中心',
                component:User,
            }
        ];
        const {pathname}=this.props.location;
        return (
          <div>
              <NavBar className='fixed-header' mode='dark' style={{zIndex:99}}>{navList.find(v=>v.path==pathname).title} </NavBar>
              <div style={{paddingTop:45}}>
                  <Switch >
                      {
                          navList.map(v=>(
                              <Route  key={v.path} path={v.path} component={v.component}></Route>
                          ))
                      }
                  </Switch>

              </div>
              <NavBarLink data={navList}></NavBarLink>
          </div>
        )
    }
}
export default DashBoard