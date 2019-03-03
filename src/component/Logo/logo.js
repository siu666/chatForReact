import React from 'react';
import logoImg from './logo.png'
import './logo.css'
class Logo extends React.Component{
    render(){
        return (
            <div className='logo-container'>
                <div className='img'><img src={logoImg}  alt=''/></div>

            </div>
        )
    }
}
export default Logo