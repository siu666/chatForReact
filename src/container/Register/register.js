import React from 'react';
import Logo from '../../component/Logo/logo';
import {List,InputItem,WingBlank,WhiteSpace,Button,Radio} from 'antd-mobile';
import {register} from '../../redux/user.redux'
import {connect} from 'react-redux';
import {Redirect,Link,Route,Router} from 'react-router-dom'
// import {Router} from 'react-router'
@connect(
    state=>state.user,
    {register}
)

class Register extends React.Component{
     constructor(props){
         super(props)
         this.state={
             name:'',
             pwd:'',
             confirmPwd:'',
             type:'genius',
         }
         this.handleRegister=this.handleRegister.bind(this)
     }
    handleChange(key,val){
           this.setState({
               [key]:val
           })
    }
    handleRegister(){
        this.props.register(this.state)

    }
    render(){

        const RadioItem=Radio.RadioItem
        return (
            <div>
                {this.props.RedirectTo?<Redirect to={this.props.RedirectTo}/>:null}
                <Logo></Logo>
                {this.props.msg?<p>{this.props.msg}</p>:''}
                <List>
                    <InputItem
                    onChange={v=>this.handleChange('name',v)}
                    >用户名</InputItem>
                    <InputItem
                        type='password'
                        onChange={v=>this.handleChange('pwd',v)}
                    >密码</InputItem>
                    <InputItem
                        type='password'
                        onChange={v=>this.handleChange('confirmPwd',v)}
                    >确认密码 </InputItem>
                </List>
                {/*{*/}
                    {/*this.state.identidyList.map(item=>{*/}
                        {/*return <RadioItem checked={this.state.type=='genius'} onClick={()=>this.handleChange('type',item.key)}>{item.name}</RadioItem>*/}
                    {/*})*/}
                {/*}*/}
                <RadioItem
                    checked={this.state.type=='genius'}
                    onClick={()=>this.handleChange('type','genius')}>
                   牛人
                </RadioItem>
                <RadioItem
                    checked={this.state.type=='boss'}
                    onClick={()=>this.handleChange('type','boss')}>
                    boss
                </RadioItem>
                <WhiteSpace/>
                <Button type='primary' onClick={this.handleRegister}>注册</Button>
                <h1>注册页</h1>
            </div>
        )
    }
}
export default Register