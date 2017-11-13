import { combineReducers } from 'redux';
import mainReducer from './reducers/mainreducer';
import { reducer as formReducer } from 'redux-form';

const reducers = combineReducers({
  mainReducer,
  form: formReducer,
});

export default reducers;

/* function setClicks(state, clicks) {
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

function adddata(state, na) {
  const newState = state;
  newState.data.push({ name: na });
  return newState;
}

function deldata(state, actionIndex) {
  const newState = state;
  newState.data.splice(actionIndex, 1);

  return newState;
}

function setdatas(state, datas) {
  const newState = state;
  newState.data = datas;
  return newState;
}

function setmess(state, mess) {
  const newState = state;
  newState.message = mess;
  return newState;
}

const initState = { clicks: 0, loggedIn: false, data: [], message: { message: '', type: '' } };

export default (state = initState, action) => {
  switch (action.type) {
    case 'SET_CLICKS':
      return setClicks(state, action.clicks);
    case 'LOADING':
      return setLoading(state, action.what);
    case 'ADD_DATA':
      return adddata(state, action.name);
    case 'DEL_DATA':
      return deldata(state, action.index);
    case 'SET_DATAS':
      return setdatas(state, action.data);
    case 'SET_MESS':
      return setmess(state, action.mess);
    default:
      return state;
  }
}; */

export const getUser = state => state.mainReducer.user || { username: 'guest' };
export const getClicks = state => state.mainReducer.clicks || '0';
export const getLoggedIn = state => state.mainReducer.loggedIn;

export const getDatas = state => state.mainReducer.data || [];
export const getMess = state => state.mainReducer.message || { message: '', type: '' };

export const getAdmin = state => state.mainReducer.adminForm || { users: [] };
