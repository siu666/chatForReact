import React from 'react';
import axios from 'axios';
import {Card,WingBlank,WhiteSpace} from 'antd-mobile';
import Scroll from 'react-bscroll'
import {connect} from 'react-redux'
import {requetUserList} from '../../redux/userList.redux'
import './index.css'
import 'react-bscroll/lib/react-scroll.css'
import UserList from '../userList/userList'
@connect(
    state=>state.userList,
    {requetUserList}
)
class Boss extends React.Component{
    constructor(props){
        super(props)
        this.state={
            GeniusList:[],
            beginPos:0
        }
    }
    componentDidMount(){
       // axios.post('/user/list',{type:'genius',skip:this.state.currentPage}).then(res=>{
       //     if(res.data.code=='0'){
       //         this.setState({GeniusList:res.data.data})
       //     }
       // })
        this.props.requetUserList('genius','0')
    }
    loadMore = () => {
        this.state.beginPos+=10
        // 更新数据
        return new Promise( resolve => {

            if(this.props.reqListLength<10){
                return
            }
           this.props.requetUserList('genius',this.state.beginPos)
            resolve();
        })
    }
    render(){
        return (
                <div className='container' >
                    <Scroll

                        click={true}
                        pullUpLoad
                        pullUpLoadMoreData={this.loadMore}
                    >
                        <UserList userList={this.props.userList}></UserList>
                    </Scroll>
                </div>
        )
    }
}
export default Boss
