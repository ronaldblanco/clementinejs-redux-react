
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
//DATA CONTROLLER

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

//////////////////////////////////////////////////////////////////////////
//RESET LOCAL
function setMess(mess) {
  return { type: 'SET_MESS', mess: mess };
}

var message = null;
/*function updateMess (data){
      var info = JSON.parse(data);
      if(info.message != null && info.message != undefined){
         message.innerHTML = '<div class="'+info.type+'"><h2>'+ info.message +'</h2></div>';
      }
}*/
export const resetlocal = () => (dispatch) =>{
  dispatch({ type: 'LOADING', what: 'message' });
		message = document.querySelector('#message');
		//document.querySelector('#resetaction').addEventListener('click', function(){
            var resetUsername = document.querySelector('#resetusername').value;
            ajax('POST', 'reset?name=' + resetUsername).then(() => {
               ajax('GET', 'message')
                .then(data => {
                  //updateMess(data);
                  dispatch(setMess(data));
                 }, error => { console.log(error); });
            }, error => { console.log(error); });
            
         //});
};