import React from 'react';
import axios from 'axios';
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
class Genius extends React.Component{
    constructor(props){
        super(props)
        this.state={
            GeniusList:[],
            beginPos:0
        }
    }
    componentDidMount(){
        this.props.requetUserList('boss','0')
    }
    loadMore = () => {
        this.state.beginPos+=10
        // 更新数据
        return new Promise( resolve => {
            console.log('pulling up and load data')
            if(this.props.reqListLength<10){
                return
            }
            this.props.requetUserList('boss',this.state.beginPos)
            resolve();
        })
    }
    render(){
        return (
            <div className='container' >
                <Scroll
                    click={true}
                    scrollbar={false}
                    pullUpLoad
                    pullUpLoadMoreData={this.loadMore}
                >
                    <UserList userList={this.props.userList}></UserList>
                </Scroll>
            </div>
        )
    }
}
export default Genius
