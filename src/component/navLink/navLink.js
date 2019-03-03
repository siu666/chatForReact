import React from 'react';
import {TabBar} from  'antd-mobile';
import {withRouter} from 'react-router-dom';
import {connect } from 'react-redux'
@withRouter
@connect(
    state=>state.chat
)
class decorators-legacyNavBarLink extends React.Component{

     render(){
         // const {pathname}=this.props.location
         const navList=this.props.data.filter(v=>!v.hide)
         // console.log(navList)
         return (
             <TabBar>
                 {navList.map(v=>(
                     <TabBar.Item
                         badge={v.path=='/msg'?this.props.unread:0}
                           key={v.path}
                         title={v.text}
                         icon={{uri:require(`./img/${v.icon}.png`)}}
                         onPress={()=>{
                             this.props.history.push(v.path)
                             // alert(v.path)
                         }}
                     ></TabBar.Item>
                 ))}
             </TabBar>
         )
     }
}
export default NavBarLink