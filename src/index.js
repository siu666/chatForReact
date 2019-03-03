import React from 'react';
import ReactDOM from 'react-dom';
// import App from './App';
import { createStore, applyMiddleware,compose } from 'redux';
import thunk from 'redux-thunk'
import { Provider } from 'react-redux'
import { BrowserRouter, Route,Switch } from 'react-router-dom'
import Login from './container/Login/login'
import Register from './container/Register/register'
import reducers from './reducer';
import DashBoard from './component/dashBoard/dashboard'
import GeniusInfo from './container/geniusInfo/geniusInfo'
import Chat from './component/chat/chat'
import './index.css'
import 'antd-mobile/dist/antd-mobile.css';
import AutoRoute from './component/AutoRoute/autoRoute';
import './config'
import BossInfo from './container/bossInfo/bossInfo'

const store = createStore(reducers,compose(
    applyMiddleware(thunk),
    window.devToolsExtension?window.devToolsExtension():f=>f
    ) );
function Boss (){
    return <p>boss</p>
}
ReactDOM.render(
    (<Provider store={store}>
        <BrowserRouter>
          <div>
              <AutoRoute></AutoRoute>
              <Switch>
                  <Route path='/bossinfo' component={BossInfo}></Route>
                  <Route path='/GeniusInfo' component={GeniusInfo}></Route>
                  <Route path='/Login' component={Login}></Route>
                  <Route path='/Register' component={Register}></Route>
                  <Route path='/chat/:user' component={Chat}></Route>
                  <Route  component={DashBoard}></Route>
              </Switch>
          </div>
        </BrowserRouter>
    </Provider>),

document.getElementById('root'));

