import { createStore } from 'redux'
// const state = 10;
const ADD_GUN = '加机关枪';
const REMOVE_GUN = '减机关枪';

export function counter(state = 10, action) {
  switch (action.type) {
    case ADD_GUN:
      return state + 1
    case REMOVE_GUN:
      return state - 1;
    default:
      return state
  }
}
const store = createStore(counter)
const init = store.getState();
store.dispatch({ type:ADD_GUN})
export function add_GUN() {
  return { type: ADD_GUN }
}
export function remove_GUN() {
  return { type: REMOVE_GUN }
}
export function asyncAddGun(){
  return dispatch=>{
     setTimeout(()=>{
        dispatch(add_GUN())
     },2000)
  }
}