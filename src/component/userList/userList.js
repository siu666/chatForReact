import React from 'react';
import {Card,WingBlank,WhiteSpace} from 'antd-mobile';
import {withRouter} from 'react-router-dom';
@withRouter
class UserList extends React.Component{
    handleClick(v){
        this.props.history.push(`/chat/${v._id}`)
    }
    render(){
        return(
            <WingBlank>
                {
                    this.props.userList.map(item=>(
                        item.avatar?
                            <Card
                                key={item._id}
                                onClick={()=>this.handleClick(item)}
                            >
                                <Card.Header
                                    key={item._id}
                                    title={item.name}
                                    thumb={require(`../images/${item.avatar}.png`)}
                                    extra={<span>{item.title}</span>}
                                >
                                </Card.Header>
                            </Card>:''
                    ))
                }
            </WingBlank>
        )
    }
}
export default UserList