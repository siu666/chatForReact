import React from 'react';
import {NavBar,InputItem,TextareaItem,Button} from 'antd-mobile'
import AvatarSelector from '../../component/avatarSeletor/avatarSelector'
import {connect} from 'react-redux'
import {update} from '../../redux/user.redux';
import {Redirect} from 'react-router-dom';
@connect(
    state=>state.user,
    {update}
)
class bossInfo extends React.Component{
    constructor(props){
        super(props)
        this.state={
            pos:'',
            avatar:'',
            company:'',
            salary:'',
            condition:''
        }
        this.saveBossInfo=this.saveBossInfo.bind(this)
    }
    handleChange(key,val){
        this.setState({
            [key]:val})
    }
    saveBossInfo(){
    }
    render(){
        const path =this.props.location.pathname;
        const RedirectTo=this.props.RedirectTo
        return (
            <div>
                {RedirectTo&&RedirectTo!=path?<Redirect to={this.props.RedirectTo}></Redirect>:''}
                <NavBar mode='dark'>BOSS信息</NavBar>
                <div  style={{marginTop:45}}></div>
                <AvatarSelector
                    selecAvatar={(v)=>{
                        this.setState({
                            avatar:v
                        })
                    }}
                ></AvatarSelector>
                <InputItem
                    onChange={v=>this.handleChange('pos',v)}
                >
                    招聘职位
                </InputItem>
                <InputItem
                    onChange={(v)=>this.handleChange('company',v)}
                >
                    公司名称
                </InputItem>
                <InputItem
                    onChange={(v)=>this.handleChange('salary',v)}
                >
                    职位薪资
                </InputItem>
                {/*<InputItem*/}
                    {/*onChange={v=>this.handleChange('condition',v)}*/}
                {/*>*/}
                    {/*职位要求*/}
                {/*</InputItem>*/}
                <TextareaItem
                onChange={(v)=>this.handleChange('condition',v)}
                 rows={3}
                autoHeight
                title='职位要求'
                >
                </TextareaItem>
                <Button type='primary'
                onClick={()=>{this.props.update(this.state)}}
                >保存</Button>
            </div>

        )
    }
}
export default bossInfo