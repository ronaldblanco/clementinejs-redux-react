
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
};
