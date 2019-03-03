import React from 'react';
import {Link} from 'react-router-dom'
let LinkName=['Page1','Page2','Page3']
class Home extends React.Component{
    render(){
        return(
            <div>
                <div>This is Home!</div>
                <div style={{padding:"0 10px 0 10px"}}>
                <div style={{display:'flex',backgroundColor:'red',justifyContent:'space-between',width:'100%',flexWrap:'wrap'}}>
                    {
                        LinkName.map(function (item,index) {
                            return <div style={{padding:'10px'}}><Link to={`${item}`}> to{item}</Link></div>
                        })
                    }
                    {/*<div style={{padding:'30px'}}>*/}
                        {/*<Link to='/Page2'>to2</Link>*/}
                    {/*</div>*/}
                    {/*<div style={{padding:'30px'}}>*/}
                        {/*<Link to='/Page3'>to3</Link>*/}
                    {/*</div>*/}
                    {/*<div style={{padding:'30px'}}>*/}
                        {/*<Link to='/Page3'>to3</Link>*/}
                    {/*</div>*/}
                    {/*<div style={{padding:'30px'}}>*/}
                        {/*<Link to='/Page3'>to3</Link>*/}
                    {/*</div>*/}
                    {/*<div style={{padding:'30px'}}>*/}
                        {/*<Link to='/Page3'>to3</Link>*/}
                    {/*</div>*/}
                </div>
                </div>
            </div>
        );
    }
}

export default Home;