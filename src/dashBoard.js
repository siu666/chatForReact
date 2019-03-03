import React from 'react';
import { Link, Route,Redirect } from 'react-router-dom';
import Hello from './helloWorld.js'
import {connect } from 'react-redux'
import {logout,getUserState} from './Auth.redux';
import './config';
import 'antd-mobile/dist/antd-mobile.css'
function Erying() {
    return <h1>二营</h1>
}
function YIying() {
    return <h1>yi营</h1>
}
function Qibinglian() {
    return <h1>骑兵连</h1>
}
@connect(
    state=>state.auth,
    {logout,getUserState}
)
class dashBoard extends React.Component {
         
    constructor(props) {
        super(props)
        this.state={
             data:{}
        }
    }
  componentDidMount(){
      this.props.getUserState();
    }
    render() {

        const redirectTologin=<Redirect to='/login' ></Redirect>
        const app=(
            <div>
                <h1>{this.props.name}年龄{this.props.age}</h1>
                {this.props.isAuth?<button onClick={this.props.logout}>注销</button>:null}
                <ul>
                    <li>
                        <Link to='/dashBoard/'>一营</Link>
                    </li>
                    <li>
                        <Link to='/dashBoard/erying'>二营</Link>
                    </li>
                    <li>
                        <Link to='/dashBoard/qibinglian'>骑兵连</Link>
                    </li>
                </ul>
                <Route path='/dashBoard/' exact component={Hello}></Route>
                <Route path='/dashBoard/erying' component={Erying}></Route>
                <Route path='/dashBoard/qibinglian' component={Qibinglian}></Route>
            </div>
        )
        return this.props.isAuth?app:redirectTologin
    }
}
export default dashBoard