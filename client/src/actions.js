
import ajax from './utils/ajax';

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

////////////////////////////////////////////////////////////////////////////

function setDatas(nDatas) {
  return { type: 'SET_DATAS', data: nDatas };
}

export const adddata = () => (dispatch) => {
  dispatch({ type: 'LOADING', what: 'datas' });
  var query = "?name=" + document.querySelector('#name').value;
  ajax('POST', '/api/:id/info' + 'add' + query).then(() => {
    ajax('GET', '/api/:id/info').then(data => {
      const nDatas = data.data;
      console.log(nDatas);
      dispatch(setDatas(nDatas));
    
    }, error => { console.log(error); });
  }, error => { console.log(error); });
  
};

export const deldata = () => (dispatch) => {
  dispatch({ type: 'LOADING', what: 'datas' });
  var query = "?name=" + document.querySelector('input[name = "radioData"]:checked').value;
  ajax('DELETE', '/api/:id/info' + 'del' + query).then(() => {
   ajax('GET', '/api/:id/info')
   .then(data => {
     const nDatas = data.data;
      console.log(nDatas);
      dispatch(setDatas(nDatas));
    
   }, error => { console.log(error); });
 }, error => { console.log(error); });
 
};
