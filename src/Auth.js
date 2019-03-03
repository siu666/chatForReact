import React from 'react'
import {loginState} from './Auth.redux';
import {connect} from 'react-redux';
import axios from 'axios'
import {login,getUserState} from './Auth.redux'
import { add_GUN,remove_GUN,asyncAddGun } from './counter.redux.js'
import {Redirect} from 'react-router-dom'

@connect(state=>state.auth,
{login,getUserState}
)
class Auth extends React.Component{
    
    constructor(props){
        super(props)
       
    }
     componentDidMount(){

    this.props.getUserState();
    }
    render(){
      return  (
          <div>
              <h1>{this.props.isAuth?<Redirect to='/dashBoaard'></Redirect>:''}</h1>
              <h2>请先登陆</h2>
              <button onClick={this.props.login}>登陆</button>
          </div>
      )
    }
}
export default Auth