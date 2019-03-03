import React from 'react';
import axios from 'axios';
import {withRouter} from 'react-router-dom';
import {connect} from 'react-redux'
import {getLoginData} from '../../redux/user.redux'
@withRouter
    @connect(
        state=>state.user,
        {getLoginData}
    )
class AutoRoute extends React.Component{
    componentDidMount(){
        const publicList=['/login','/register'];
        const pathName=this.props.location.pathname;
        if(publicList.indexOf(pathName)>-1){
            return null
        }
        axios.get('/user/info').then(res=>{
             if(res.status=='200'){

                 if(res.data.code=='0'){
                     this.props.getLoginData(res.data.data);
                 }else{
                   this.props.history.push('/login')
                 }
             }
        })
    }
    render(){
        return ''
    }
}
export default AutoRoute