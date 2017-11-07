
import ajax from './utils/ajax';

let query = '';
let resetUsername = '';

function setClicks(nClicks) {
  return { type: 'SET_CLICKS', clicks: nClicks };
}

export const reset = () => (dispatch) => {
  dispatch({ type: 'LOADING', what: 'clicks' });
  ajax('DELETE', '/api/user/clicks').then(() => {
    ajax('GET', '/api/user/clicks')
    .then(data => {
      const nClicks = data.clicks;
      dispatch(setClicks(nClicks));
     /* eslint-disable no-console */
    }, error => { console.log(error); });
  }, error => { console.log(error); });
 /* eslint-enable no-console */
};

export const click = () => (dispatch) => {
  dispatch({ type: 'LOADING', what: 'clicks' });
  ajax('POST', '/api/user/clicks').then(() => {
    ajax('GET', '/api/user/clicks').then(data => {
      const nClicks = data.clicks;
      dispatch(setClicks(nClicks));
    /* eslint-disable no-console */
    }, error => { console.log(error); });
  }, error => { console.log(error); });
  /* eslint-enable no-console */
};

// //////////////////////////////////////////////////////////////////////////
// DATA CONTROLLER

function setDatas(nDatas) {
  return { type: 'SET_DATAS', data: nDatas };
}

export const adddata = () => (dispatch) => {
  dispatch({ type: 'LOADING', what: 'datas' });
  query = `?name=${document.querySelector('#name').value}`;
  // query = '?name=' + document.querySelector('#name').value;
  // ajax('POST', '/api/:id/infoadd' + query).then(() => {
  ajax('POST', `/api/:id/infoadd${query}`).then(() => {
    ajax('GET', '/api/:id/info').then(data => {
      const nDatas = data.data;
      dispatch(setDatas(nDatas));
      /* eslint-disable no-console */
    }, error => { console.log(error); });
  }, error => { console.log(error); });
  /* eslint-enable no-console */
};

export const deldata = () => (dispatch) => {
  dispatch({ type: 'LOADING', what: 'datas' });
  query = `?name=${document.querySelector('input[name = "radioData"]:checked').value}`;
  // query = '?name=' + document.querySelector('input[name = "radioData"]:checked').value;
  // ajax('DELETE', '/api/:id/infodel' + query).then(() => {
  ajax('DELETE', `/api/:id/infodel${query}`).then(() => {
    ajax('GET', '/api/:id/info')
    .then(data => {
      const nDatas = data.data;
      // console.log(nDatas);
      dispatch(setDatas(nDatas));
      /* eslint-disable no-console */
    }, error => { console.log(error); });
  }, error => { console.log(error); });
  /* eslint-enable no-console */
};

// ////////////////////////////////////////////////////////////////////////
// RESET LOCAL
function setMess(me) {
  return { type: 'SET_MESS', mess: me };
}

export const resetlocal = () => (dispatch) => {
  dispatch({ type: 'LOADING', what: 'message' });
  resetUsername = document.querySelector('#resetusername').value;
  // ajax('POST', '/auth/localnewreset?name=' + resetUsername).then(data => {
  ajax('POST', `/auth/localnewreset?name=${resetUsername}`).then(data => {
    dispatch(setMess({ message: data.message, type: data.type }));
    /* eslint-disable no-console */
  }, error => { console.log(error); });
  /* eslint-enable no-console */
};

// //////////////////////////////////////////////////////////////////////////////////////
// FORM ACTIONS POSIBILITY

export const onSubmit = (values, dispatch/* , getState */) => {
  dispatch({ type: 'NEW_USER', user: values });
  /* ajax(
  'GET',
  `/auth/form?username=${values.username}?display=${values.display}?password=${values.password}`
  )
  .then(data => { */
  ajax('POST', '/auth/localnew').then(data => {
    console.log(data);
    // dispatch(setMess({ message: data.message, type: data.type }));
    /* eslint-disable no-console */
  }, error => { console.log(error); });
  /* eslint-enable no-console */
 /* window.location.replace(
 `/auth/form?username=${values.username}?display=${values.display}?password=${values.password}`
 );*/
 // window.alert(`You submitted:\n\n${JSON.stringify(values, null, 2)}`);
};
