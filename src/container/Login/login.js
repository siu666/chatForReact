import React from 'react';
import Logo from '../../component/Logo/logo'
import {List,InputItem,WingBlank,WhiteSpace,Button } from 'antd-mobile';
import {login} from '../../redux/user.redux';
import {Redirect} from 'react-router-dom'
import {connect} from 'react-redux';
@connect(
    state=>state.user,
    {login}
)
class Login extends React.Component{
    constructor(props){
        super(props);
        this.state={
            name:'',
            pwd:'',
        }
        this.register=this.register.bind(this);
        this.handleLogin=this.handleLogin.bind(this)
    }
    register(){
        this.props.history.push('/register')
    }
    handleChange(key,val){
        this.setState({
            [key]:val
        })
    }
    handleLogin(){
        // console.log(this.state)
        this.props.login(this.state);
    }
        render(){
            return (
                <div>
                    {this.props.RedirectTo&&this.props.RedirectTo!='/login'&&this.props.RedirectTo!='login'?<Redirect to={this.props.RedirectTo}/>:null}
                    <Logo></Logo>
                    {this.props.msg?<p>{this.props.msg}</p>:''}
                    <WingBlank>
                        <List>
                            <InputItem
                            onChange={v=>this.handleChange('name',v)}
                            >用户名</InputItem>
                            <InputItem
                            type='password'
                            onChange={v=>this.handleChange('pwd',v)}
                            >密码</InputItem>
                        </List>
                        <Button type='primary'
                        onClick={this.handleLogin}
                        >登录</Button>
                        <WhiteSpace/>
                        <Button onClick={this.register} type='primary'>注册</Button>
                    </WingBlank>
                    <h1>登录页</h1>
                </div>

            )

        }
}
export default Login