import { combineReducers } from 'redux';
import mainReducer from './reducers/mainreducer';
import { reducer as formReducer } from 'redux-form';

const reducers = combineReducers({
  mainReducer,
  form: formReducer,
});

export default reducers;

export const getUser = state => state.mainReducer.user || { username: 'guest' };
export const getClicks = state => state.mainReducer.clicks || '0';
export const getLoggedIn = state => state.mainReducer.loggedIn;

export const getDatas = state => state.mainReducer.data || [];
export const getMess = state => state.mainReducer.message || { message: '', type: '' };

// eslint-disable-next-line max-len
export const getAdmin = state => state.mainReducer.adminForm || { users: [{ username: '', display: '', email: '', password: '', clicks: 0, datas: [{ name: '' }] }] };

export const getEnv = state => state.mainReducer.env || '';
