import React from 'react';
import {Grid,List} from 'antd-mobile'
class AvatarSelector extends React.Component{
    constructor(props){
        super(props)
        this.state={

        }
    }
    render(){
        const avatarList='中国,兴业,农业,工商,建设,民生,招商,邮政'
            .split(',')
            .map((v,index)=>({
                icon:require(`../images/${v}.png`),
                text:v
            }))
        const iconSelect=this.state.icon?(<div>
            <span>已选择头像</span>
            <img style={{width:20}} src={this.state.icon}/>
        </div>):'请选择头像'
        return(
            <div>
                <List renderHeader={()=>iconSelect}>
                </List>
                <Grid data={avatarList}
                columnNum={5}
                 onClick={
                     v=>{
                         this.props.selecAvatar(v.text)
                         this.setState(v)
                 }}
                />
            </div>
        )
    }
}
export default AvatarSelector