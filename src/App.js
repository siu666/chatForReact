import React from 'react';
import { BrowserRouter as Router,Route} from 'react-router-dom';

import Home from './Home';
import Page1 from './Page1';
import Page2 from './Page2';
import Page3 from './Page3';
import {createStore} from 'redux';
const state = 10;
function counter (action){
     switch(action.type){
         case 'add_GUN':
         return state+1
         case 'remove_GUN':
          return state-1;
          default :
          return state
            }
}
const store = createStore(counter)
const init =store.getState();
console.log(init)
class App extends React.Component {
    render(){
        return(
            <Router >
                <div>
                    <Route exact path="/" component={Home} />
                    <Route path="/Page1" component={Page1} />
                    <Route path="/Page2" component={Page2} />
                    <Route path="/Page3" component={Page3} />
                    {/*<Link to='/Page1/'>toPage1</Link>*/}
                </div>
            </Router>
        )
    }
}
export default App