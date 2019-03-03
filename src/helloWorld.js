import React from 'react';
import { connect } from 'react-redux'
import { add_GUN,remove_GUN,asyncAddGun } from './counter.redux.js'
import {logout} from "./Auth.redux";

@connect(state=>({num:state.counter}), { add_GUN, remove_GUN, asyncAddGun,logout })
class helloWorld extends React.Component {
    constructor(props){
           super(props)
    }
    render() {
        return (
            <div>
                <h1>Welcome to React{this.props.num}把</h1>
                <button onClick={this.props.add_GUN}>加一把</button>
                <button onClick={this.props.remove_GUN}>减一把</button>
                <button onClick={this.props.asyncAddGun}>过两秒再加一把</button>
            </div>
        )
    }
}
export default helloWorld