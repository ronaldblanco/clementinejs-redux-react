/*import { combineReducers } from 'redux';
import clicksReducer from './reducers/clickreducer';
import datasReducer from './reducers/datareducer';

const reducers = combineReducers({
  clicksReducer,
  datasReducer
});

export default reducers;*/

function setClicks(state, clicks) {
  return {
    ...state,
    clicks,
    loading: undefined,
  };
}

function setLoading(state, what) {
  return {
    ...state,
    loading: what,
  };
}

function adddata (state, name){
    let newState = state;
    newState.data.push({name: name});
    return newState;
}

function deldata (state, actionIndex){
    let newState = state;
    newState.data.splice(actionIndex, 1);
    /*newState.data = [];
    state.data.map((obj, index) => {
          if (index !== actionIndex) {
            newState.data.push(obj);
          }
      });*/
    return newState;
}

const initState = { clicks: 0, loggedIn: false, data: [] };

export default (state = initState, action) => {
  switch (action.type) {
    case 'SET_CLICKS':
      return setClicks(state, action.clicks);
    case 'LOADING':
      return setLoading(state, action.what);
    case 'ADD_DATA':
      return adddata(state, action.name)
    case 'DEL_DATA':
      return deldata(state, action.index);
    case 'SET_DATAS':
      return action.data;
    default:
      return state;
  }
};

export const getUser = state => state.user || { username: 'guest' };
export const getClicks = state => state.clicks || '0';
export const getLoggedIn = state => state.loggedIn;

export const getDatas = state => state.data || [];
